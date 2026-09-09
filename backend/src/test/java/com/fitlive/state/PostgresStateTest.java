package com.fitlive.state;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.server.ResponseStatusException;
import com.fitlive.security.DeviceAuthService;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.*;
/** Runs against a disposable real PostgreSQL database; never use a production connection. */
@SpringBootTest
@EnabledIfEnvironmentVariable(named="FITLIVE_POSTGRES_TEST",matches="true")
class PostgresStateTest {
 @Autowired StateService states;@Autowired ObjectMapper json;@Autowired DeviceAuthService devices;
 @Test void transactionsIsolationReplayDeletionAndDeviceRevocation()throws Exception {
  String owner="test:"+UUID.randomUUID(), other="test:"+UUID.randomUUID(),id=UUID.randomUUID().toString();
  var demo=json.readTree("{\"type\":\"mode\",\"mode\":\"demo\"}");
  assertEquals(0,states.load(owner).get("version"));
  var first=states.mutate(owner,id,0,demo,null);
  assertEquals(1L,first.get("version"));
  assertEquals(first,states.mutate(owner,id,0,demo,null));
  assertEquals(0,states.load(other).get("version"));
  var imported=states.bootstrap(other,1,(com.fasterxml.jackson.databind.JsonNode)first.get("state"));
  assertEquals(first.get("state"),imported.get("state"));
  var protectedImport=states.bootstrap(other,99,json.readTree(new DomainEngine().blank()));
  assertEquals(1L,protectedImport.get("version"),"transfer cannot overwrite an existing account");
  assertEquals(409,assertThrows(ResponseStatusException.class,()->states.mutate(owner,UUID.randomUUID().toString(),0,demo,null)).getStatusCode().value());
  assertTrue(states.view(owner).has("plan"));
  String device=(String)devices.create(owner).get("token");
  assertEquals(owner,devices.owner(device));
  String deletion=UUID.randomUUID().toString();
  states.mutate(owner,deletion,1,json.readTree("{\"type\":\"delete\",\"confirmation\":\"DELETE\"}"),null);
  assertEquals(2L,states.load(owner).get("version"));
  assertNull(devices.owner(device));
  assertEquals(0,((com.fasterxml.jackson.databind.JsonNode)states.load(owner).get("state")).path("health").size());
  assertEquals(2L,states.mutate(owner,deletion,1,json.readTree("{\"type\":\"delete\",\"confirmation\":\"DELETE\"}"),null).get("version"));
  assertEquals(409,assertThrows(ResponseStatusException.class,()->states.mutate(owner,id,0,demo,null)).getStatusCode().value());
 }
}
