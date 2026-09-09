"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, ImagePlus } from "lucide-react";
import { allowed, type State, type Command } from "@/lib/domain";
import { mealDraftSchema, type MealDraft } from "@/lib/ai/meal-analysis";

async function preparePhoto(file: File): Promise<string> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error("Choose a JPEG, PNG or WebP photo. For HEIC, export it as JPEG first.");
  if (file.size > 15000000) throw new Error("Choose a photo smaller than 15 MB.");
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale)); canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("This browser couldn't prepare the photo.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/jpeg", 0.8);
    if (image.length > 1800000) throw new Error("Choose a smaller photo.");
    return image;
  } finally { bitmap.close(); }
}
export function PhotoMeal({ state, busy, act }: { state: State; busy: boolean; act: (command: Command, close?: boolean) => Promise<boolean> }) {
  const camera = useRef<HTMLInputElement>(null), upload = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [consent, setConsent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [draft, setDraft] = useState<MealDraft | null>(null);
  const [fixing, setFixing] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const locked = busy || pending;
  async function photo(file?: File) {
    if (!file) return;
    setError(""); setPending(true);
    try { setImage(await preparePhoto(file)); setDescription(""); setDraft(null); setConfirmed(false); setSaved(false); }
    catch(e) { setError((e as Error).message); } finally { setPending(false); }
  }
  async function analyze() {
    setError(""); setPending(true); setSaved(false); setConfirmed(false);
    try {
      const response = await fetch("/api/meals/analyze", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consent, description, ...(image ? { image } : {}), ...(draft ? { draft } : {}) }), signal: AbortSignal.timeout(45000) });
      const result = await response.json();
      if (!response.ok) throw new Error((result as { error?: string }).error ?? "Analysis is unavailable.");
      const parsed = mealDraftSchema.parse(result); setDraft(parsed); setFixing(!parsed.items.length);
      if (!parsed.items.length) setError(parsed.uncertainty || "No food identified. Add a description or another photo.");
    } catch(e) { setError(e instanceof Error && e.name === "TimeoutError" ? "Analysis took too long. Your draft is still here; please try again." : (e as Error).message); }
    finally { setPending(false); }
  }
  async function save() {
    if (!draft || !confirmed) return;
    setError(""); setPending(true);
    try {
      const parsed = mealDraftSchema.parse(draft);
      const items = parsed.items.map(item => {
        const { grams, ...food } = item;
        return { grams, food: { ...food, id: crypto.randomUUID(), source: "AI estimate · portions reviewed by user; nutrients per 100 g" } };
      });
      if (!items.length) throw new Error("Add at least one food.");
      if (items.some(x => !allowed(x.food, state.profile))) throw new Error("A food conflicts with your saved dietary restrictions. Correct the ingredients or use manual entry.");
      if (await act({ type: "meal-batch", items }, false)) {
        setDraft(null); setImage(""); setDescription(""); setConfirmed(false); setFixing(false); setSaved(true);
      } else setError("Meal wasn't saved. Your draft is preserved; check the connection and retry.");
    } catch(e) { setError((e as Error).message); } finally { setPending(false); }
  }
  return <section className="panel small-space photo-meal">
    <p className="eyebrow">FOOD JOURNAL</p><h3>One photo. Your whole meal.</h3>
    <p>Take a photo or describe your plate. Review the portions, then save everything together.</p>
    <input ref={camera} type="file" accept="image/jpeg,image/png,image/webp" capture="environment" hidden onChange={e => { void photo(e.target.files?.[0]); e.target.value = ""; }} />
    <input ref={upload} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={e => { void photo(e.target.files?.[0]); e.target.value = ""; }} />
    <div className="row photo-actions"><button type="button" className="primary" disabled={locked} onClick={() => camera.current?.click()}><Camera size={18}/> Take photo</button><button type="button" className="secondary" disabled={locked} onClick={() => upload.current?.click()}><ImagePlus size={18}/> Upload photo</button></div>
    {image && <div className="meal-photo"><Image src={image} width={360} height={240} unoptimized alt="Your meal ready for analysis"/><button type="button" className="secondary" disabled={locked} onClick={() => { setImage(""); setDraft(null); setConfirmed(false); }}>Remove photo</button></div>}
    {(!draft || fixing) && <label className="field"><span>{draft ? "What should we fix?" : "Describe your meal (optional with a photo)"}</span><textarea disabled={locked} maxLength={1600} value={description} onChange={e => setDescription(e.target.value)} placeholder={draft ? "The rice is 100 g cooked, and that's tomato dal, not curry." : "100 g cooked rice with tomato dal and 100 g paneer"}/></label>}
    <label className="consent"><input type="checkbox" checked={consent} disabled={locked} onChange={e => setConsent(e.target.checked)}/> Allow this photo and description to be sent to Hugging Face and its AI provider for analysis.</label>
    <p className="muted">FitLive does not save the photo. Location metadata is removed before upload. You can use manual food entry below without sending a photo to AI.</p>
    {(!draft || fixing) && <button type="button" className="primary" disabled={locked || !consent || (!image && !description.trim())} onClick={() => void analyze()}>{pending ? "Analyzing your meal…" : draft ? "Update meal details" : "Analyze meal"}</button>}
    {!!draft?.items.length && <div className="meal-review"><h4>Does this look right?</h4><p className="muted">Portions and nutrition are estimates. {draft.uncertainty}</p>
      {draft.items.map((item,i) => <div className="meal-item" key={i}><div className="review-food-row"><label className="field"><span>Food</span><input readOnly disabled={locked} maxLength={120} value={item.name} onChange={e => { setConfirmed(false); setDraft({ ...draft, items: draft.items.map((x,j) => j === i ? { ...x, name:e.target.value } : x) }); }}/></label><label className="field"><span>Portion (g)</span><input disabled={locked} type="number" min={1} max={2000} value={item.grams || ""} onChange={e => { setConfirmed(false); setDraft({ ...draft, items: draft.items.map((x,j) => j === i ? { ...x, grams:Number(e.target.value) } : x) }); }}/></label></div><p className="muted">~{Math.round(item.kcal * item.grams / 100)} kcal · {Math.round(item.protein * item.grams / 100)} g protein{item.allergens.length ? ` · Possible allergens: ${item.allergens.join(", ")}` : " · Allergens may be missed"}</p><button type="button" className="secondary" disabled={locked} onClick={() => { setConfirmed(false); setDraft({ ...draft, items: draft.items.filter((_,j) => j !== i) }); if(draft.items.length === 1) setFixing(true); }}>Remove {item.name}</button></div>)}
      <button type="button" className="secondary" disabled={locked} onClick={() => { setFixing(true); setDescription(""); setConfirmed(false); }}>Fix details</button>
      <label className="consent"><input type="checkbox" disabled={locked} checked={confirmed} onChange={e => setConfirmed(e.target.checked)}/> I reviewed the foods and portions and accept the nutrition estimates. Photos cannot verify allergens or hidden ingredients.</label>
      <button type="button" className="primary" disabled={locked || fixing || !confirmed || draft.items.some(x => !x.name.trim() || x.grams < 1 || x.grams > 2000)} onClick={() => void save()}>{pending ? "Please wait…" : "Save meal"}</button>
    </div>}
    {saved && <p role="status">Meal saved. Your daily totals are updated.</p>}{error && <p role="alert">{error}</p>}
  </section>;
}
