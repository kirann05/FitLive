package com.fitlive.state;
import com.fitlive.security.*;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.*;
import org.springframework.security.core.context.SecurityContextHolder;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.HexFormat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
class BridgeAuthFilterTest {
 private final String secret="a-long-fixture-secret-for-bridge-testing-only";
 @Test void forgedIdentityAndExpiredSignaturesAreRejected()throws Exception{var req=new MockHttpServletRequest("GET","/api/state");req.addHeader("X-Fitlive-Signature","00");req.addHeader("X-Fitlive-Owner","victim");req.addHeader("X-Fitlive-Time","0");var res=new MockHttpServletResponse();new BridgeAuthFilter(secret,mock(DeviceAuthService.class)).doFilter(req,res,new MockFilterChain());assertEquals(401,res.getStatus());}
 @Test void signedBridgeRequestAuthenticatesOwnerAndPreservesBody()throws Exception{String body="{\"id\":\"test\"}",time=String.valueOf(Instant.now().getEpochSecond());var req=new MockHttpServletRequest("POST","/api/state");req.setContent(body.getBytes(StandardCharsets.UTF_8));req.addHeader("X-Fitlive-Owner","alice");req.addHeader("X-Fitlive-Time",time);String canonical="POST\n/api/state\n"+time+"\nalice\n"+DeviceAuthService.hash(body.getBytes(StandardCharsets.UTF_8));Mac mac=Mac.getInstance("HmacSHA256");mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8),"HmacSHA256"));req.addHeader("X-Fitlive-Signature",HexFormat.of().formatHex(mac.doFinal(canonical.getBytes(StandardCharsets.UTF_8))));var res=new MockHttpServletResponse();try{new BridgeAuthFilter(secret,mock(DeviceAuthService.class)).doFilter(req,res,(request,response)->{assertEquals("platform:alice",SecurityContextHolder.getContext().getAuthentication().getName());assertEquals(body,new String(request.getInputStream().readAllBytes(),StandardCharsets.UTF_8));});}finally{SecurityContextHolder.clearContext();}}
}
