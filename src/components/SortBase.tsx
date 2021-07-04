import React from 'react';

import Array, { ArrayNode } from './Array';
import Header from './Header';

type SortAlgorithmProps = {
  title: string;
  // eslint-disable-next-line no-unused-vars
  executeSort: (array: ArrayNode[], renderCallback: (array: ArrayNode[]) => void) => void;
};

const SortAlgorithm: React.FC<SortAlgorithmProps> = (props: SortAlgorithmProps) => {
  const { title, executeSort } = props;

  return (
    <React.Fragment>
      <Header title={title} />
      <main className="h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <Array
                type="sort"
                onExecute={(
                  array: ArrayNode[],
                  // eslint-disable-next-line no-unused-vars
                  renderCallback: (array: ArrayNode[]) => void,
                ) => {
                  executeSort(array, renderCallback);
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default SortAlgorithm;
