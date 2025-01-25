import React, { useEffect } from 'react'
import { TBoard, TCard, TColumn } from '../misc/data';
import { Board } from "../components/Board/Board"
import { actor } from '@/main';
import { useSelector } from '@xstate/react';
import { useNavigate } from 'react-router';

function getInitialData(): TBoard {
    // Doing this so we get consistent ids on server and client
    const getCards = (() => {
        let count: number = 0;

        return function getCards({ amount }: { amount: number }): TCard[] {
            return Array.from({ length: amount }, (): TCard => {
                const id = count++;
                return {
                    // id: `card:${id}`,
                    // description: `Card ${id}`,
                    title: `Card ${id}`
                };
            });
        };
    })();

    const columns: TColumn[] = [
        { title: 'Column A', cards: getCards({ amount: 60 }), color: 1 },
        { title: 'Column B', cards: getCards({ amount: 4 }) },
        // { title: 'Column C', cards: getCards({ amount: 30 }) },
        // { title: 'Column D', cards: getCards({ amount: 12 }) },
        // { title: 'Column E', cards: getCards({ amount: 0 }) },
        // { title: 'Column F', cards: getCards({ amount: 44 }) },
        // { title: 'Column G', cards: getCards({ amount: 4 }) },
        // { title: 'Column H', cards: getCards({ amount: 8 }) },
        // { title: 'Column I', cards: getCards({ amount: 30 }) },
    ];

    return {
        columns,
    };
}

function BoardPage() {
    const appState = useSelector(actor, (state) => state.value);
    let navigate = useNavigate()
    useEffect(() => {
        if (appState === "login") {
            navigate("/")
        }
    }, [appState])

    return (
        <Board initial={getInitialData()} />
    )
}

export default BoardPage