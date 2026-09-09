package com.fitlive.state;

import com.fitlive.security.DeviceAuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(properties="fitlive.bridge-secret=fixture-bridge-secret-at-least-32-characters")
@AutoConfigureMockMvc
@EnabledIfEnvironmentVariable(named="FITLIVE_POSTGRES_TEST",matches="true")
class PostgresApiTest {
 @Autowired MockMvc mvc;@Autowired ObjectMapper json;
 private MockHttpServletRequestBuilder signed(String path,String owner,String body)throws Exception {
  String time=String.valueOf(Instant.now().getEpochSecond());
  var bytes=body.getBytes(StandardCharsets.UTF_8);
  var mac=Mac.getInstance("HmacSHA256");mac.init(new SecretKeySpec("fixture-bridge-secret-at-least-32-characters".getBytes(StandardCharsets.UTF_8),"HmacSHA256"));
  String signature=HexFormat.of().formatHex(mac.doFinal(("POST\n"+path+"\n"+time+"\n"+owner+"\n"+DeviceAuthService.hash(bytes)).getBytes(StandardCharsets.UTF_8)));
  return post(path).contentType("application/json").content(body).header("X-Fitlive-Owner",owner).header("X-Fitlive-Time",time).header("X-Fitlive-Signature",signature);
 }
 @Test void signedAccountPairingDeviceOwnershipAndRevocation()throws Exception {
  String owner="api-"+UUID.randomUUID();
  mvc.perform(get("/api/state")).andExpect(status().isUnauthorized());
  String body=json.writeValueAsString(Map.of("id",UUID.randomUUID().toString(),"version",0,"command",Map.of("type","profile","profile",Map.ofEntries(Map.entry("name","Fixture"),Map.entry("diet","vegan"),Map.entry("allergies",List.of()),Map.entry("dislikes",List.of()),Map.entry("goal","Maintain fitness"),Map.entry("days",3),Map.entry("equipment","Bodyweight"),Map.entry("protein",100),Map.entry("calories",2000),Map.entry("timezone","America/Chicago"),Map.entry("consent",true)))));
  mvc.perform(signed("/api/state",owner,body)).andExpect(status().isOk()).andExpect(jsonPath("$.version").value(1));
  var device=mvc.perform(signed("/api/devices",owner,"{}")).andExpect(status().isOk()).andReturn();
  String token=json.readTree(device.getResponse().getContentAsString()).path("token").asText();
  mvc.perform(get("/api/state").header("Authorization","Bearer "+token)).andExpect(status().isOk()).andExpect(jsonPath("$.state.profile.name").value("Fixture"));
  mvc.perform(post("/api/bootstrap").header("Authorization","Bearer "+token).contentType("application/json").content("{\"version\":1,\"state\":{}}")).andExpect(status().isForbidden());
  mvc.perform(post("/api/state").header("Authorization","Bearer "+token).contentType("application/json").content(json.writeValueAsString(Map.of("id",UUID.randomUUID().toString(),"version",1,"command",Map.of("type","delete","confirmation","DELETE"))))).andExpect(status().isOk());
  mvc.perform(get("/api/state").header("Authorization","Bearer "+token)).andExpect(status().isUnauthorized());
 }
}
