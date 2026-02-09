import circuitLogo from '../assets/circuit.svg';
import saveTimeLogo from '../assets/savetime.svg';
import cicuitData from '../data/cicuit.json';
import savetimeData from '../data/savetime.json';
import type { ProductProgress, RawProductProgress } from '../types/app';

const logoMap = {
  circuit: circuitLogo,
  savetime: saveTimeLogo,
} as const;

export const dailyProgress: ProductProgress[] = ([cicuitData, savetimeData] as RawProductProgress[]).map((project) => ({
  ...project,
  logo: logoMap[project.logoKey as keyof typeof logoMap] ?? saveTimeLogo,
  updates: project.updates.map((item, index, updates) => ({
    ...item,
    day: item.day?.trim() || `Day ${index + 1}`,
    onWaitlist: item.onWaitlist ?? item.waitlistCount ?? item.signUps ?? 0,
    workDone: Array.isArray(item.workDone) ? item.workDone : [item.workDone],
    // For a list of length n (>2), mark (n-1)th element as current (1-based index).
    status: index < updates.length - 2 ? 'done' : index === updates.length - 2 ? 'current' : 'future',
  })),
}));
