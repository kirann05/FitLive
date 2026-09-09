package com.fitlive.state;
import org.junit.jupiter.api.Test;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.junit.jupiter.api.Assertions.*;
class DomainEngineTest {
 @Test void sharedPolicyRunsInJava()throws Exception {var engine=new DomainEngine();var json=new ObjectMapper();var state=engine.apply(engine.blank(),"{\"type\":\"mode\",\"mode\":\"demo\"}","seed",0,"2026-09-09T15:00:00Z",null);assertEquals("demo",json.readTree(state).path("mode").asText());var view=json.readTree(engine.view(state,"2026-09-09T15:00:00Z"));assertEquals("Reduced",view.path("recovery").path("band").asText());}
 @Test void invalidCommandRejectedWithoutHostAccess()throws Exception {var engine=new DomainEngine();assertThrows(Exception.class,()->engine.apply(engine.blank(),"{\"type\":\"purchase\"}","x",0,"2026-09-09T15:00:00Z",null));}
}
