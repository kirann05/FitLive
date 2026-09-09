package com.fitlive.health;
import com.fitlive.SecurityConfiguration;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.*;
@WebMvcTest(controllers=HealthController.class, properties={"spring.security.oauth2.resourceserver.jwt.issuer-uri=https://issuer.example.test", "spring.datasource.password=test"})
@Import(SecurityConfiguration.class)
class HealthControllerTest {
 @Autowired MockMvc mvc; @MockitoBean HealthService service; @MockitoBean JwtDecoder decoder;
 @Test void anonymousCannotRead()throws Exception{mvc.perform(get("/api/health/export")).andExpect(status().isUnauthorized());verifyNoInteractions(service);}
 @Test void ownerComesFromVerifiedIdentity()throws Exception{when(service.list("alice")).thenReturn(List.of());mvc.perform(get("/api/health/export").param("owner","bob").with(jwt().jwt(j->j.subject("alice")))).andExpect(status().isOk());verify(service).list("alice");verify(service,never()).list("bob");}
 @Test void emptyHealthBatchIsRejected()throws Exception{mvc.perform(post("/api/health/sync").with(jwt()).contentType("application/json").content("{\"samples\":[]}")).andExpect(status().isBadRequest());verifyNoInteractions(service);}
 @Test void deletionIsOwnerScoped()throws Exception{mvc.perform(delete("/api/health").with(jwt().jwt(j->j.subject("alice")))).andExpect(status().isOk());verify(service).delete("alice");}
}
