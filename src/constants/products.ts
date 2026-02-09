import circuitLogo from '../assets/circuit.svg';
import saveTimeLogo from '../assets/savetime.svg';
import cicuitData from '../data/cicuit.json';
import savetimeData from '../data/savetime.json';
import type { DailyUpdate, ProductProgress, RawProductProgress } from '../types/app';

const logoMap = {
  circuit: circuitLogo,
  savetime: saveTimeLogo,
} as const;

const toStatus = (status: string): DailyUpdate['status'] => {
  if (status === 'done' || status === 'current' || status === 'future') {
    return status;
  }
  return 'future';
};

export const dailyProgress: ProductProgress[] = ([cicuitData, savetimeData] as RawProductProgress[]).map((project) => ({
  ...project,
  logo: logoMap[project.logoKey as keyof typeof logoMap] ?? saveTimeLogo,
  updates: project.updates.map((item, index) => ({
    ...item,
    day: item.day?.trim() || `Day ${index + 1}`,
    onWaitlist: item.onWaitlist ?? item.waitlistCount ?? item.signUps ?? 0,
    workDone: Array.isArray(item.workDone) ? item.workDone : [item.workDone],
    status: toStatus(item.status),
  })),
}));
