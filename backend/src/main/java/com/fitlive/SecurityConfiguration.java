package com.fitlive;
import com.fitlive.security.BridgeAuthFilter;
import com.fitlive.security.DeviceAuthService;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.core.*;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
public class SecurityConfiguration {
 @Bean @org.springframework.boot.autoconfigure.condition.ConditionalOnExpression("'${OIDC_ISSUER:}' != ''")
 JwtDecoder jwtDecoder(@Value("${OIDC_ISSUER}")String issuer,@Value("${OIDC_AUDIENCE:fitlive}")String audience){
  var decoder= NimbusJwtDecoder.withIssuerLocation(issuer).build();
  OAuth2TokenValidator<Jwt> audienceCheck=jwt->jwt.getAudience().contains(audience)?OAuth2TokenValidatorResult.success():OAuth2TokenValidatorResult.failure(new OAuth2Error("invalid_token","Invalid audience",null));
  decoder.setJwtValidator(new DelegatingOAuth2TokenValidator<>(JwtValidators.createDefaultWithIssuer(issuer),audienceCheck));return decoder;
 }
 @Bean SecurityFilterChain security(HttpSecurity http,DeviceAuthService devices,ObjectProvider<JwtDecoder> decoders,@Value("${fitlive.bridge-secret:}")String secret)throws Exception{
  http.csrf(c->c.disable()).sessionManagement(c->c.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).authorizeHttpRequests(a->a.dispatcherTypeMatchers(jakarta.servlet.DispatcherType.ERROR).permitAll().requestMatchers("/actuator/health/**").permitAll().anyRequest().authenticated()).addFilterBefore(new BridgeAuthFilter(secret,devices),UsernamePasswordAuthenticationFilter.class);
  JwtDecoder decoder=decoders.getIfAvailable();
  if(decoder!=null)http.oauth2ResourceServer(o->o.bearerTokenResolver(req->{String a=req.getHeader("Authorization");return a!=null&&a.startsWith("Bearer ")&&!a.startsWith("Bearer flv_")?a.substring(7):null;}).jwt(j->j.decoder(decoder)));
  http.exceptionHandling(e->e.authenticationEntryPoint((req,res,ex)->res.sendError(401)));
  return http.build();
 }
}
