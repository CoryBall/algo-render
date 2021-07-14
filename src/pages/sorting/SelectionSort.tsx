import React from 'react';

import Array, { ArrayNode } from '../../components/Array';
import Header from '../../components/Header';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const SelectionSortPage: React.FC = () => {
  async function executeSelectionSortPage(
    array: ArrayNode[],
    renderCallback: (array: ArrayNode[]) => void,
  ): Promise<void> {
    const timeout = (1 / Math.pow(array.length, 3)) * 200;
    for (let i = 0; i < array.length; i++) {
      let minIndex = i;
      array[i].selected = true;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[i]) {
          array[minIndex].selected = false;
          minIndex = j;
          array[minIndex].selected = true;
          renderCallback(array);
          await delay(timeout);
        }
      }
      if (minIndex !== i) {
        //swap nodes
        const node = array[i];
        array[i] = array[minIndex];
        array[minIndex] = node;
        renderCallback(array);
      }
      array[i].selected = false;
      array[i].sorted = true;
      renderCallback(array);
    }
  }

  return (
    <React.Fragment>
      <Header title="Selection Sort" />
      <main className="h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <Array type="sort" onExecute={executeSelectionSortPage} />
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default SelectionSortPage;
