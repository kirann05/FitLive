package com.fitlive.security;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.time.Instant;
@Service public class RequestLimits {
 private final JdbcTemplate db;
 public RequestLimits(JdbcTemplate db){this.db=db;}
 public void check(String owner,String action,int maximum,int seconds){
  long now=Instant.now().getEpochSecond(),window=now/seconds;
  var rows=db.queryForList("INSERT INTO request_limits(owner_id,bucket,count,expires_at) VALUES(?,?,1,?) ON CONFLICT(owner_id,bucket) DO UPDATE SET count=request_limits.count+1 WHERE request_limits.count<? RETURNING count",owner,action+":"+window,(window+1)*seconds,maximum);
  db.update("DELETE FROM request_limits WHERE owner_id=? AND expires_at<?",owner,now-86400);
  if(rows.isEmpty())throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS,"Please pause before trying again");
 }
}
