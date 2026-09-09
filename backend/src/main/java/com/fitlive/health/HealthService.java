package com.fitlive.health;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
@Service
public class HealthService {
 private final JdbcTemplate db; private final ObjectMapper json;
 public HealthService(JdbcTemplate db,ObjectMapper json){this.db=db;this.json=json;}
 @Transactional public int ingest(String owner,List<HealthSummary> samples) throws Exception {
  int saved=0;
  for(var s:samples){var canonical=new HealthSummary(s.id(),s.date(),s.sleep(),s.rhr(),s.hrv(),s.source(),s.sampleAt(),Instant.EPOCH);var payload=json.writeValueAsString(canonical);int inserted=db.update("INSERT INTO health_samples(owner_id,source_id,day,payload) VALUES(?,?,?,?) ON CONFLICT(owner_id,source_id) DO NOTHING",owner,s.id(),s.date(),payload);if(inserted==0){var old=db.queryForObject("SELECT payload FROM health_samples WHERE owner_id=? AND source_id=?",String.class,owner,s.id());if(!payload.equals(old))throw new ResponseStatusException(HttpStatus.CONFLICT,"Source ID already contains a different sample");}saved+=inserted;}
  return saved;
 }
 public List<Map<String,Object>> list(String owner){return db.queryForList("SELECT source_id,day,payload,received_at FROM health_samples WHERE owner_id=? ORDER BY day DESC,received_at DESC",owner);}
 @Transactional public void delete(String owner){db.update("DELETE FROM health_samples WHERE owner_id=?",owner);}
}
