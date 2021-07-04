import React from 'react';

import Array, { ArrayNode } from '../../components/Array';
import Header from '../../components/Header';

const BinarySearchPage: React.FC = () => {
  function executeBinarySearch(
    array: ArrayNode[],
    renderCallback: (array: ArrayNode[]) => void,
    searchNumber?: number,
  ): void {}

  return (
    <React.Fragment>
      <Header title="Binary Search" />
      <main className="h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <Array type="search" onExecute={executeBinarySearch} />
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </React.Fragment>
  );
};

export default BinarySearchPage;
