package com.fitlive.security;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.HexFormat;
import java.util.Map;
@Service
public class DeviceAuthService {
 private final JdbcTemplate db;
 public DeviceAuthService(JdbcTemplate db){this.db=db;}
 public static String hash(byte[] bytes){try{return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(bytes));}catch(Exception e){throw new IllegalStateException(e);}}
 public String owner(String token){if(token.length()>150)return null;var rows=db.queryForList("SELECT owner_id FROM device_tokens WHERE token_hash=? AND expires_at>CURRENT_TIMESTAMP",hash(token.getBytes(StandardCharsets.UTF_8)));return rows.isEmpty()?null:(String)rows.getFirst().get("owner_id");}
 @Transactional public Map<String,Object> create(String owner){byte[] bytes=new byte[32];new SecureRandom().nextBytes(bytes);String token="flv_"+Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);Instant expires=Instant.now().plusSeconds(90L*86400);db.update("DELETE FROM device_tokens WHERE owner_id=?",owner);db.update("INSERT INTO device_tokens(token_hash,owner_id,expires_at) VALUES(?,?,?)",hash(token.getBytes(StandardCharsets.UTF_8)),owner,java.sql.Timestamp.from(expires));return Map.of("token",token,"expires",expires.toString());}
 public void revoke(String owner){db.update("DELETE FROM device_tokens WHERE owner_id=?",owner);}
}
