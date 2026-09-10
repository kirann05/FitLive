/** Local diagnostics only: no exercise names, weights, health data or network calls. */
export function recordTrainingMetric(owner: string, event: {kind:"set"|"session";taps:number;typed:boolean;elapsedMs:number;source:"manual"|"voice"}) {
  try {const key="fitlive-training-metrics:"+owner;const previous=JSON.parse(localStorage.getItem(key)??"[]");localStorage.setItem(key,JSON.stringify([...(Array.isArray(previous)?previous:[]).slice(-499),{...event,at:Date.now()}]));}catch{/* Logging remains available if diagnostics storage fails. */}
}
