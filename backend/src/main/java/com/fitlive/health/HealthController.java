package com.fitlive.health;
import java.util.List;
import java.util.Map;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/health")
public class HealthController {
 private final HealthService service;
 public HealthController(HealthService service){this.service=service;}
 public record Batch(@NotNull @Size(min=1,max=100) List<@Valid HealthSummary> samples){}
 @PostMapping("/sync") public Map<String,Object> sync(org.springframework.security.core.Authentication jwt,@Valid @RequestBody Batch batch)throws Exception{return Map.of("saved",true,"newSamples",service.ingest(jwt.getName(),batch.samples()));}
 @GetMapping("/export") public List<Map<String,Object>> export(org.springframework.security.core.Authentication jwt){return service.list(jwt.getName());}
 @DeleteMapping public Map<String,Boolean> delete(org.springframework.security.core.Authentication jwt){service.delete(jwt.getName());return Map.of("deleted",true);}
}
