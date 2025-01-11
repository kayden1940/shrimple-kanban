import React, { forwardRef, memo, type ReactNode, useEffect } from 'react';

import { autoScrollWindowForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import { Box, xcss } from '@atlaskit/primitives';

import { useBoardContext } from '../../misc/boardContext';

type BoardProps = {
    children: ReactNode;
};

const boardStyles = xcss({
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    gap: 'space.100',
    width: "100%",
    height: '100vh',
    // flexShrink: 0,
    alignItems: "baseline",
    padding:"space.100",
    // backgroundColor: "color.background.accent.red.bolder"
});
// className="flex flex-row h-screen w-full gap-3 overflow-x-scroll p-12 bg-gray-300"


const Board = forwardRef<HTMLDivElement, BoardProps>(({ children }: BoardProps, ref) => {
    const { instanceId } = useBoardContext();

    useEffect(() => {
        return autoScrollWindowForElements({
            canScroll: ({ source }) => source.data.instanceId === instanceId,
        });
    }, [instanceId]);

    return (
        <Box xcss={boardStyles} ref={ref}>
            {children}
        </Box>
    );
});

export default memo(Board);
