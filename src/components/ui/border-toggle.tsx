'use client';

import { useBorderSettings } from '@/contexts/border-settings-context';
import UISwitch from './switch';

export const BorderToggle = () => {
    const { showBorders, toggleBorders } = useBorderSettings();

    const handleToggle = () => {
        pendo.track("border_display_toggled", {
            borders_enabled: !showBorders,
        });
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
