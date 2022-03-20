import React from 'react';
import { match } from '../lib/util/match';
import { numberFormatter } from '../lib/util/numberFormatter';
import ActionIcon from './ActionIcon';

export default function QuickActions({ actions }: any) {
    return (
        <div className="my-[12px] inline-flex w-full max-w-[425px] justify-between gap-[8px] text-13px leading-[16px] text-dim-grey">
            {actions.map((action: any) => (
                    <div key={action.type} className="flex justify-start">
                        <ActionIcon action={action.type} />

                        {action.data && (
                            <span className="px-[12px]">
                                {numberFormatter(action.data)}
                            </span>
                        )}
                    </div>
                ))}
        </div>
    );
}
