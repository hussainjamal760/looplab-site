import { 
  Code, 
  Smartphone, 
  Brain, 
  Palette, 
  ShieldAlert, 
  Mic, 
  Gamepad2 
} from 'lucide-react';

export const MODULES_DATA = [
  {
    id: 1,
    title: 'Web Development',
    tag: 'Dual Track',
    isOnsiteOnly: false,
    icon: Code,
    image: '/assets/loopverse/web-dev-art.jpg',
    desc: 'Design and ship full stack web applications against a live problem statement.',
    onsiteBrief: 'Beginner-friendly brief calibrated for a 7-hour sprint with live mentor support.',
    virtualBrief: 'Harder, full-scale cloud/database challenges utilizing the full ~26-hour window.'
  },
  {
    id: 2,
    title: 'App Development',
    tag: 'Dual Track',
    isOnsiteOnly: false,
    icon: Smartphone,
    image: '/assets/loopverse/app-dev-art.jpg',
    desc: 'Build native or cross platform mobile apps that solve a real user problem.',
    onsiteBrief: 'Focus on core user flow, polished UI, and functional APK/iOS simulator demo.',
    virtualBrief: 'Multi-screen architecture, offline sync, or production-grade background services.'
  },
  {
    id: 3,
    title: 'AI / ML (Applied & Research)',
    tag: 'Dual Track',
    isOnsiteOnly: false,
    icon: Brain,
    image: '/assets/loopverse/ai-ml-art.jpg',
    desc: 'Design and train models or build AI powered features with real world applicability.',
    onsiteBrief: 'Fast LLM integrations, prompt engineering pipelines, and functional API agents.',
    virtualBrief: 'Custom fine-tuned weights, complex inference pipelines, and novel research benchmarks.'
  },
  {
    id: 4,
    title: 'UI / UX Design',
    tag: 'Dual Track',
    isOnsiteOnly: false,
    icon: Palette,
    image: '/assets/loopverse/ui-ux-art.jpg',
    desc: 'Reimagine a product experience end to end, from research to a polished prototype.',
    onsiteBrief: 'Rapid design sprint: user research summary, wireframes, and high-fidelity Figma prototype.',
    virtualBrief: 'Deep design system tokenization, micro-animations, design tokens, and user test logs.'
  },
  {
    id: 5,
    title: 'Cybersecurity & Open Innovation',
    tag: 'Dual Track',
    isOnsiteOnly: false,
    icon: ShieldAlert,
    image: '/assets/loopverse/cybersecurity-art.jpg',
    desc: 'A capture the flag and open track hybrid for security challenges or any bold idea.',
    onsiteBrief: 'Hands-on CTF jeopardy challenges and live vulnerability demonstration.',
    virtualBrief: 'Complex multi-tier penetration challenges, open-source defense tools, and exploit audits.'
  },
  {
    id: 6,
    title: 'Pitching Competition',
    tag: 'Onsite Only',
    isOnsiteOnly: true,
    icon: Mic,
    image: '/assets/loopverse/pitching-art.jpg',
    desc: 'Pitch a venture or product concept to a panel of investors, mentors, and judges.',
    onsiteBrief: 'Live onstage 5-minute deck pitch + 3-minute Q&A with real venture capital judges.',
    virtualBrief: 'Exclusive to the onsite track this edition. Not available for virtual teams.'
  },
  {
    id: 7,
    title: 'Game Development',
    tag: 'Onsite Only',
    isOnsiteOnly: true,
    icon: Gamepad2,
    image: '/assets/loopverse/game-dev-art.jpg',
    desc: 'New for this edition. Design and build a playable game prototype within the sprint window.',
    onsiteBrief: 'Create a playable 2D/3D build or physics prototype before the 5 PM cutoff.',
    virtualBrief: 'Exclusive to the onsite track this edition. Not available for virtual teams.'
  }
];
