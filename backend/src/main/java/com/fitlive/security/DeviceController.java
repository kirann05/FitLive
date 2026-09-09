package com.fitlive.security;
import com.fitlive.state.StateService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.Map;
@RestController
@RequestMapping("/api/devices")
public class DeviceController {
 private final DeviceAuthService devices;private final StateService state;
 public DeviceController(DeviceAuthService devices,StateService state){this.devices=devices;this.state=state;}
 private void bridge(Authentication auth){if(auth.getAuthorities().stream().noneMatch(a->a.getAuthority().equals("ROLE_BRIDGE")))throw new ResponseStatusException(HttpStatus.FORBIDDEN);}
 @PostMapping public Map<String,Object> create(Authentication auth)throws Exception{bridge(auth);var s=(JsonNode)state.load(auth.getName()).get("state");if(!s.path("profile").path("consent").asBoolean()||!s.path("mode").asText().equals("real"))throw new ResponseStatusException(HttpStatus.CONFLICT,"Create a consented real workspace first");return devices.create(auth.getName());}
 @DeleteMapping public Map<String,Boolean> revoke(Authentication auth){bridge(auth);devices.revoke(auth.getName());return Map.of("revoked",true);}
}
