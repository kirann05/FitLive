package com.fitlive.security;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.*;
public class BridgeAuthFilter extends OncePerRequestFilter {
 private final String secret;private final DeviceAuthService devices;
 public BridgeAuthFilter(String secret,DeviceAuthService devices){this.secret=secret;this.devices=devices;}
 @Override protected void doFilterInternal(HttpServletRequest req,HttpServletResponse res,FilterChain chain)throws IOException,ServletException{
  int maximum=req.getRequestURI().equals("/api/bootstrap")?2_100_000:200_000;
  if(req.getMethod().equals("POST")||req.getMethod().equals("PUT")) {
   byte[] bytes=req.getInputStream().readNBytes(maximum+1);if(bytes.length>maximum){res.sendError(413);return;}req=new CachedRequest(req,bytes);
  }
  String authorization=req.getHeader("Authorization");String signature=req.getHeader("X-Fitlive-Signature");
  if(signature!=null){
   if(secret.length()<32){res.sendError(401);return;}
   String owner=req.getHeader("X-Fitlive-Owner"),timestamp=req.getHeader("X-Fitlive-Time");
   byte[] body=req.getInputStream().readNBytes(maximum+1);if(body.length>maximum){res.sendError(413);return;}
   try{if(owner==null||owner.length()>200||timestamp==null||Math.abs(Instant.now().getEpochSecond()-Long.parseLong(timestamp))>60)throw new IllegalArgumentException();String canonical=req.getMethod()+"\n"+req.getRequestURI()+"\n"+timestamp+"\n"+owner+"\n"+DeviceAuthService.hash(body);Mac mac=Mac.getInstance("HmacSHA256");mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8),"HmacSHA256"));if(!MessageDigest.isEqual(mac.doFinal(canonical.getBytes(StandardCharsets.UTF_8)),HexFormat.of().parseHex(signature)))throw new IllegalArgumentException();SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken("platform:"+owner,null,List.of(new SimpleGrantedAuthority("ROLE_BRIDGE"))));}catch(Exception invalid){res.sendError(401);return;}chain.doFilter(new CachedRequest(req,body),res);return;
  }
  if(authorization!=null&&authorization.startsWith("Bearer flv_")){String owner=devices.owner(authorization.substring(7));if(owner==null){res.sendError(401);return;}SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(owner,null,List.of(new SimpleGrantedAuthority("ROLE_USER"))));}
  chain.doFilter(req,res);
 }
 private static class CachedRequest extends HttpServletRequestWrapper {
  private final byte[] body;CachedRequest(HttpServletRequest req,byte[] body){super(req);this.body=body;}
  @Override public ServletInputStream getInputStream(){var in=new ByteArrayInputStream(body);return new ServletInputStream(){public int read(){return in.read();}public boolean isFinished(){return in.available()==0;}public boolean isReady(){return true;}public void setReadListener(ReadListener listener){try{if(in.available()>0)listener.onDataAvailable();else listener.onAllDataRead();}catch(IOException e){listener.onError(e);}}};}
  @Override public BufferedReader getReader(){return new BufferedReader(new InputStreamReader(getInputStream(),StandardCharsets.UTF_8));}
 }
}
