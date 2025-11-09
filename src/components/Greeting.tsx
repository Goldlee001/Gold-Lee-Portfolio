"use client";
import { useEffect, useRef, useState } from "react";
import { Mic } from "lucide-react";

function chooseFemaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices?.length) return null;

  const preferredNames = [
    "Microsoft Aria", "Microsoft Zira",
    "Google UK English Female", "Google US English",
    "Samantha", "Victoria", "Karen", "Tessa", "Moira", "Serena",
    "Allison", "Ava", "Amelia", "Susan", "Emma"
  ];

  const enVoices = voices.filter(v => /^en(-|_)?/i.test(v.lang));

  for (const name of preferredNames) {
    const found = enVoices.find(v => v.name.includes(name));
    if (found) return found;
  }

  const femaleHint = enVoices.find(v =>
    /(female|samantha|victoria|karen|tessa|aria|zira|ava|allison|amelia|susan|emma)/i.test(v.name)
  );
  return femaleHint || enVoices[0] || voices[0];
}

export default function Greeting() {
  const [speaking, setSpeaking] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const greetedRef = useRef(false);
  const voicesLoadedRef = useRef(false);

  const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return;
    voicesLoadedRef.current = true;
    setVoice(chooseFemaleVoice(voices));
  };

  useEffect(() => {
    loadVoices();
    const handler = () => loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", handler);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", handler);
  }, []);

  const speakGreeting = () => {
    const utter = new SpeechSynthesisUtterance(
      "Initializing access... Connection secured. Welcome to Gold Lee’s World — where creativity meets power, and innovation becomes art. This is more than a showcase — it’s a realm of mastery, built with vision, precision, and purpose. Step inside, and experience excellence redefined."
    );
    utter.lang = voice?.lang || "en-US";
    utter.rate = 0.95;
    utter.pitch = 1.15;
    if (voice) utter.voice = voice;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  useEffect(() => {
    if (voicesLoadedRef.current && !greetedRef.current) {
      greetedRef.current = true;
      const id = setTimeout(() => speakGreeting(), 200);
      return () => clearTimeout(id);
    }
  }, [voice]);

  return (
    <button
      onClick={speakGreeting}
      title="Tap to replay greeting"
      className={`p-1.5 rounded-full border transition-all duration-300 shadow-sm
        ${speaking
          ? "bg-ninja-glow/80 border-ninja-steel animate-pulse shadow-[0_0_6px_#2CA8E2]"
          : "bg-ninja-blue-dark border-ninja-steel hover:bg-ninja-steel hover:shadow-[0_0_6px_#2CA8E2]"
        }`}
    >
      <Mic
        className={`w-3.5 h-3.5 transition-colors duration-300
          ${speaking ? "text-ninja-dark" : "text-ninja-white"}`}
      />
    </button>
  );
}
