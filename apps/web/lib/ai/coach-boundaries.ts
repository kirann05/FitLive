/** Shared by hosted coaching and the deterministic explorer. */
export function coachBoundary(message: string): string | null {
  if (/\b(pain|hurts?|torn|swollen|swelling|sprain\w*|injur\w*|diagnos\w*|medication|ibuprofen|advil|painkillers?|naproxen|acetaminophen|paracetamol)\b|chest pain|treat my/i.test(message))
    return "I can’t determine what is causing your symptoms, whether something is torn, or which medicine you should take. Don’t use PACE’s workout suggestions to assess an injury. Please ask a qualified healthcare professional about the symptoms and medication question.";
  if (/\b(buy|purchase|checkout)\b|order groceries/i.test(message))
    return "I can help you review a shopping list in Eat → Groceries. FitLive does not place orders or spend money.";
  if (/\b(beer|alcohol|drunk|hangover)\b/i.test(message))
    return "I can’t assess whether training is appropriate from that message. You can choose a rest day; you don’t need to make up a missed session. PACE’s recovery data does not measure alcohol’s effects.";
  return null;
}
