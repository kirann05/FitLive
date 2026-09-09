package com.fitlive.health;
import java.time.Instant;
import java.time.LocalDate;
import jakarta.validation.constraints.*;
public record HealthSummary(@NotBlank @Size(max=120) String id,@NotNull LocalDate date,@Min(0) @Max(1440) int sleep,@Min(20) @Max(250) Double rhr,@Min(0) @Max(500) Double hrv,@Pattern(regexp="HealthKit|manual") @NotNull String source,@NotNull @PastOrPresent Instant sampleAt,@NotNull Instant syncAt) {}
