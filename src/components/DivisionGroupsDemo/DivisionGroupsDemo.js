'use client';
import React from 'react';
import clsx from 'clsx';

import {motion} from "framer-motion";
import {range} from '@/utils';
import Card from '@/components/Card';
import SliderControl from '@/components/SliderControl';

import Equation from './Equation';
import styles from './DivisionGroupsDemo.module.css';
import {LayoutGroup} from "framer-motion";

function DivisionGroupsDemo({
                                numOfItems = 12,
                                initialNumOfGroups = 1,
                                includeRemainderArea,
                            }) {
    const [numOfGroups, setNumOfGroups] = React.useState(
        initialNumOfGroups
    );
    const id = React.useId();

    const numOfItemsPerGroup = Math.floor(
        numOfItems / numOfGroups
    );

    const remainder = includeRemainderArea
        ? numOfItems % numOfGroups
        : null;

    // When we're splitting into 1-3 groups, display side-by-side
    // columns. When we get to 4, it should switch to a 2x2 grid.
    const gridStructure =
        numOfGroups < 4
            ? {
                gridTemplateColumns: `repeat(${numOfGroups}, 1fr)`,
            }
            : {
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
            };

    return (
        <LayoutGroup>
            <Card as="section" className={styles.wrapper}>
                <header className={styles.header}>
                    <SliderControl
                        label="Number of Groups"
                        className={styles.slider}
                        step={1}
                        min={1}
                        max={4}
                        value={numOfGroups}
                        onChange={(ev) =>
                            setNumOfGroups(Number(ev.target.value))
                        }
                    />
                </header>

                <div className={styles.demoWrapper}>
                    <div
                        className={clsx(styles.demoArea)}
                        style={gridStructure}
                    >
                        {range(numOfGroups).map((groupIndex) => (
                            <div key={groupIndex} className={styles.group}>
                                {range(numOfItemsPerGroup).map((index) => {
                                    const ballId = groupIndex * numOfItemsPerGroup + index;
                                    const layoutId = `${id}-ball-${ballId}`;

                                    return (
                                        <motion.div
                                            key={ballId}
                                            layoutId={layoutId}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 40,
                                            }}
                                            className={styles.item}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {includeRemainderArea && (
                    <div className={styles.remainderArea}>
                        <p className={styles.remainderHeading}>
                            Remainder Area
                        </p>

                        {range(numOfItems - remainder, numOfItems).reverse().map((ballId) => {
                            const layoutId = `${id}-ball-${ballId}`;

                            return (
                                <motion.div key={ballId} className={styles.item} layoutId={layoutId}/>
                            );
                        })}
                    </div>
                )}

                <Equation
                    dividend={numOfItems}
                    divisor={numOfGroups}
                    remainder={remainder}
                />
            </Card>
        </LayoutGroup>
    );
}

export default DivisionGroupsDemo;
