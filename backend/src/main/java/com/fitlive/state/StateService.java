package com.fitlive.state;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.time.Instant;
import java.util.Map;

@Service
public class StateService {
    private final JdbcTemplate db;
    private final DomainEngine engine;
    private final ObjectMapper json;
    public StateService(JdbcTemplate db, DomainEngine engine, ObjectMapper json) {this.db=db;this.engine=engine;this.json=json;}
    public Map<String,Object> load(String owner) throws Exception {
        var rows=db.queryForList("SELECT version,data FROM accounts WHERE owner_id=?",owner);
        return rows.isEmpty()?Map.of("version",0,"state",json.readTree(engine.blank())):
            Map.of("version",rows.getFirst().get("version"),"state",json.readTree((String)rows.getFirst().get("data")));
    }
    @Transactional
    public Map<String,Object> bootstrap(String owner,long version,JsonNode state)throws Exception {
        String validated;
        try {validated=engine.validate(state.toString());}catch(RuntimeException invalid){throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Invalid account transfer");}
        if(validated.length()>2_000_000)throw new ResponseStatusException(HttpStatus.PAYLOAD_TOO_LARGE);
        db.update("INSERT INTO accounts(owner_id,version,data) VALUES(?,?,?) ON CONFLICT(owner_id) DO NOTHING",owner,version,validated);
        return load(owner);
    }
    @Transactional
    public Map<String,Object> mutate(String owner,String id,long version,JsonNode command,JsonNode generated) throws Exception {
        if(version==0)db.update("INSERT INTO accounts(owner_id,version,data) VALUES(?,0,?) ON CONFLICT(owner_id) DO NOTHING",owner,engine.blank());
        var rows=db.queryForList("SELECT version,data FROM accounts WHERE owner_id=? FOR UPDATE",owner);
        if(rows.isEmpty())throw new ResponseStatusException(HttpStatus.CONFLICT,"Reload your account");
        if(db.queryForObject("SELECT COUNT(*) FROM operations WHERE owner_id=? AND operation_id=?",Integer.class,owner,id)>0)return load(owner);
        if(((Number)rows.getFirst().get("version")).longValue()!=version)throw new ResponseStatusException(HttpStatus.CONFLICT,"Account changed; reload and retry");
        String next;
        try { next=engine.apply((String)rows.getFirst().get("data"),command.toString(),id,version,Instant.now().toString(),generated==null?null:generated.toString()); }
        catch(org.graalvm.polyglot.PolyglotException invalid){throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Invalid command or policy conflict");}
        if(next.length()>2_000_000)throw new ResponseStatusException(HttpStatus.PAYLOAD_TOO_LARGE,"Account storage limit reached; export older records");
        db.update("UPDATE accounts SET data=?,version=?,updated_at=CURRENT_TIMESTAMP WHERE owner_id=?",next,version+1,owner);
        if(command.path("type").asText().equals("delete")) {
            db.update("DELETE FROM health_samples WHERE owner_id=?",owner);
            db.update("DELETE FROM device_tokens WHERE owner_id=?",owner);
            db.update("DELETE FROM operations WHERE owner_id=?",owner);
        }
        db.update("INSERT INTO operations(owner_id,operation_id) VALUES(?,?)",owner,id);
        return load(owner);
    }
    public JsonNode view(String owner)throws Exception {var snapshot=load(owner);return json.readTree(engine.view(snapshot.get("state").toString(),Instant.now().toString()));}
}
