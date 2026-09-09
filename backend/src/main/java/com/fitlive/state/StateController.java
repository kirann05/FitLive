package com.fitlive.state;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class StateController {
    private final StateService service;
    private final com.fitlive.security.RequestLimits limits;
    public StateController(StateService service,com.fitlive.security.RequestLimits limits){this.service=service;this.limits=limits;}
    public record Mutation(@NotBlank @Pattern(regexp="[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}") String id,@Min(0) long version,@NotNull JsonNode command,JsonNode generated){}
    public record Transfer(@Min(0) long version,@NotNull JsonNode state){}
    @PostMapping("/bootstrap") public Map<String,Object> bootstrap(Authentication auth,@Valid @RequestBody Transfer body)throws Exception {
        if(auth.getAuthorities().stream().noneMatch(a->a.getAuthority().equals("ROLE_BRIDGE")))throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.FORBIDDEN);
        return service.bootstrap(auth.getName(),body.version(),body.state());
    }
    @GetMapping("/state") public Map<String,Object> load(Authentication auth)throws Exception {return service.load(auth.getName());}
    @GetMapping("/daily") public JsonNode daily(Authentication auth)throws Exception {return service.view(auth.getName());}
    @PostMapping("/state") public Map<String,Object> mutate(Authentication auth,@Valid @RequestBody Mutation body)throws Exception {
        limits.check(auth.getName(),"mutations",120,60);
        if(body.command().path("type").asText().equals("chat")){limits.check(auth.getName(),"coach",8,60);limits.check(auth.getName(),"coach-day",100,86400);}
        boolean bridge=auth.getAuthorities().stream().anyMatch(a->a.getAuthority().equals("ROLE_BRIDGE"));
        return service.mutate(auth.getName(),body.id(),body.version(),body.command(),bridge?body.generated():null);
    }
}
