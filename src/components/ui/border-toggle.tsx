'use client';

import { useBorderSettings } from '@/contexts/border-settings-context';
import UISwitch from './switch';

export const BorderToggle = () => {
    const { showBorders, toggleBorders } = useBorderSettings();

    const handleToggle = () => {
        if (typeof window !== 'undefined' && (window as any).pendo) {
            (window as any).pendo.track("borders_toggled", {
                new_state: String(!showBorders),
                previous_state: String(showBorders),
            });
        }
        toggleBorders();
    };

    return (
        <div className="flex items-center justify-between gap-3 bottom-4 right-4 h-10 px-3 rounded-2xl border">
            <span className='text-sm font-mono text-muted-foreground'>
                Show Borders
            </span>
            <UISwitch checked={showBorders} onCheckedChange={handleToggle} />
        </div>
    );
};
