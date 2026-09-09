package com.fitlive.state;

import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.HostAccess;
import org.graalvm.polyglot.Source;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

/** Runs the exact shared policy bundle, with no Java, filesystem or network access. */
@Service
public class DomainEngine {
    private final Source source;
    public DomainEngine() throws IOException {
        var script = new ClassPathResource("engine/domain.js").getContentAsString(StandardCharsets.UTF_8);
        source = Source.newBuilder("js", script, "fitlive-domain.js").buildLiteral();
    }
    private Context context() {
        var context = Context.newBuilder("js").allowHostAccess(HostAccess.NONE)
            .allowHostClassLookup(name -> false).option("engine.WarnInterpreterOnly", "false").build();
        context.eval("js", "globalThis.structuredClone = value => JSON.parse(JSON.stringify(value));");
        context.eval(source);
        return context;
    }
    public String validate(String state) {
        try(var context=context()){context.getBindings("js").putMember("stateJson",state);return context.eval("js","JSON.stringify(FitLiveDomain.validateSnapshot(JSON.parse(stateJson)))").asString();}
    }
    public String blank() {
        try (var context = context()) { return context.eval("js", "JSON.stringify(FitLiveDomain.blank())").asString(); }
    }
    public String apply(String state, String command, String id, long version, String now, String generated) {
        try (var context = context()) {
            var bindings = context.getBindings("js");
            bindings.putMember("stateJson", state); bindings.putMember("commandJson", command);
            bindings.putMember("operationId", id); bindings.putMember("inputVersion", version);
            bindings.putMember("clockValue", now); bindings.putMember("generatedJson", generated == null ? "null" : generated);
            return context.eval("js", "JSON.stringify(FitLiveDomain.apply(JSON.parse(stateJson), JSON.parse(commandJson), operationId, inputVersion, new Date(clockValue), JSON.parse(generatedJson) || undefined))").asString();
        }
    }
    public String view(String state, String now) {
        try (var context = context()) {
            context.getBindings("js").putMember("stateJson", state);
            context.getBindings("js").putMember("clockValue", now);
            return context.eval("js", "JSON.stringify({recovery:FitLiveDomain.recovery(JSON.parse(stateJson),new Date(clockValue)),plan:FitLiveDomain.plan(JSON.parse(stateJson),new Date(clockValue)),recommendation:FitLiveDomain.recommendation(JSON.parse(stateJson),new Date(clockValue))})").asString();
        }
    }
}
