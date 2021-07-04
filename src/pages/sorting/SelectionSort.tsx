import React from 'react';

import Array, { ArrayNode } from '../../components/Array';
import Header from '../../components/Header';

const SelectionSortPage: React.FC = () => {
  function executeSelectionSortPage(
    array: ArrayNode[],
    renderCallback: (array: ArrayNode[]) => void,
  ): void {}

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
