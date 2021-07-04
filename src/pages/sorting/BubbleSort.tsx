import React from 'react';

import { ArrayNode } from '../../components/Array';
import SortBase from '../../components/SortBase';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const BubbleSortPage: React.FC = () => {
  async function executeBubbleSortPage(
    array: ArrayNode[],
    // eslint-disable-next-line no-unused-vars
    renderCallback: (array: ArrayNode[], isDone?: boolean) => void,
  ): Promise<void> {
    const timeout = (1 / Math.pow(array.length, 3)) * 200;
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j].value > array[j + 1].value) {
          // highlight compared nodes
          const node = array[j];
          array[j].selected = true;
          array[j + 1].selected = true;
          renderCallback(array);
          await delay(timeout);

          // swap nodes
          array[j] = array[j + 1];
          array[j + 1] = node;
          renderCallback(array);

          // un-highlight compared nodes
          array[j].selected = false;
          array[j + 1].selected = false;
          if (j === array.length - i - 2) array[j + 1].sorted = true;
          renderCallback(array);
        }
      }
    }
    array.map((node) => (node.sorted = true));
    renderCallback(array, true);
  }

  return <SortBase title="Bubble Sort" executeSort={executeBubbleSortPage} />;
};

export default BubbleSortPage;
