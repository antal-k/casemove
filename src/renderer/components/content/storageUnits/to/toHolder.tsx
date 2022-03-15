import StorageFilter from './toFilters';
import StorageRow from './toStorageRow';
import StorageSelectorContent from './toSelector';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sortDataFunction } from '../../shared/inventoryFunctions';
import { useState } from 'react';
import { inventorySetStoragesData } from 'renderer/store/actions/inventoryActions';
import { SelectorIcon } from '@heroicons/react/solid';
import { moveToSetSortOption } from 'renderer/store/actions/moveToActions';

function StorageUnits() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  const dispatch = useDispatch();
  const inventory = useSelector((state: any) => state.inventoryReducer);
  const toReducer = useSelector((state: any) => state.moveToReducer);
  const pricesResult = useSelector((state: any) => state.pricingReducer);
  const settingsData = useSelector((state: any) => state.settingsReducer);
  const [getStorage, setStorage] = useState(inventory.storageInventory);
  getStorage;

  async function onSortChange(sortValue) {
    dispatch(moveToSetSortOption(sortValue));
    const storageResult = await sortDataFunction(
      sortValue,
      inventory.storageInventory,
      pricesResult.prices,
      settingsData?.source?.title
    );
    console.log(storageResult);
    dispatch(inventorySetStoragesData(storageResult));
  }

  async function storageResult() {
    const storageResult = await sortDataFunction(
      toReducer.sortValue,
      inventory.combinedInventory,
      pricesResult.prices,
      settingsData?.source?.title
    );
    setStorage(storageResult);
  }
  storageResult();
  if (toReducer.sortBack == true) {
    getStorage.reverse()
  } 

  const inventoryMoveable = getStorage.filter(function (item) {
    return item[`item_moveable`] == true;
  });



  return (
    <>
      {/* Page title & actions */}
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 dark:border-opacity-50 ">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium dark:text-dark-white leading-6 mt-2 mb-2 text-gray-900 sm:truncate">
            Transfer to storage units
          </h1>
        </div>
      </div>
      {/* Storage units */}
      <StorageSelectorContent />

      <StorageFilter />

      {/* Projects table (small breakpoint and up) */}

      <div className="hidden sm:block">
        <div className="align-middle inline-block min-w-full border-b border-gray-200 dark:border-opacity-50 dark:text-gray-400">
          <table className="min-w-full">
          <thead className="dark:bg-dark-level-two bg-gray-50">
              <tr className=" border-gray-200 sticky top-7">
                <th className="table-cell px-6 py-2 border-b border-gray-200 bg-gray-50 dark:border-opacity-50 dark:bg-dark-level-two text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button onClick={() => onSortChange('Product name')}
                  className='text-gray-500 dark:text-gray-400 tracking-wider uppercase text-center text-xs font-medium text-gray-500 dark:text-gray-400'>
                  <span className='flex justify-between'>Product  <SelectorIcon className='h-2'/></span>
                    </button>
                </th>
                <th
                className="table-cell px-6 py-2 border-b border-gray-200 pointer-events-auto bg-gray-50 text-center dark:border-opacity-50 dark:bg-dark-level-two">
                    <button onClick={() => onSortChange('Price')}
                     className='text-gray-500 dark:text-gray-400 tracking-wider uppercase text-center text-xs font-medium text-gray-500 dark:text-gray-400'>
                      <span className='flex justify-between'>Price  <SelectorIcon className='h-2'/></span>
                    </button>
                </th>
                <th
                className="hidden xl:table-cell px-6 py-2 border-b bg-gray-50 border-gray-200 dark:border-opacity-50 dark:bg-dark-level-two">

                  <button onClick={() => onSortChange('Stickers')}
                  className='text-gray-500 dark:text-gray-400 tracking-wider uppercase text-center text-xs font-medium text-gray-500 dark:text-gray-400'>

                  <span className='flex justify-between'>Stickers/Patches  <SelectorIcon className='h-2'/></span>
                    </button>
                </th>

                <th
                className="hidden md:table-cell px-6 py-2 border-b bg-gray-50 border-gray-200 dark:border-opacity-50 dark:bg-dark-level-two">
                  <button onClick={() => onSortChange('tradehold')}
                  className='text-gray-500 dark:text-gray-400 tracking-wider uppercase text-center text-xs font-medium text-gray-500 dark:text-gray-400'>
                  <span className='flex justify-between'>Tradehold  <SelectorIcon className='h-2'/></span>
                    </button>
                </th>
                <th 
                  className="table-cell px-6 py-2 border-b border-gray-200 bg-gray-50 text-center dark:border-opacity-50 dark:bg-dark-level-two">
                  <button onClick={() => onSortChange('QTY')}
                  className='text-gray-500 dark:text-gray-400 tracking-wider uppercase text-center text-xs font-medium text-gray-500 dark:text-gray-400'>

                  <span className='flex justify-between'>QTY  <SelectorIcon className='h-2'/></span>
                    </button>
                </th>
                <th 
                  className="hidden md:table-cell px-6 py-2 border-b border-gray-200 bg-gray-50 dark:border-opacity-50 dark:bg-dark-level-two">
                  <button
                  className='text-gray-500 dark:text-gray-400 pointer-events-none tracking-wider uppercase text-center text-xs font-medium text-gray-500 dark:text-gray-400'>
                  Move
                    </button>
                </th>
                <th className="table-cell px-6 py-2 border-b border-gray-200 bg-gray-50  dark:border-opacity-50 dark:bg-dark-level-two text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <span className="md:hidden">move</span>
                </th>
                <th className="md:hidden table-cell px-6 py-2 border-b border-gray-200 bg-gray-50   dark:border-opacity-50 dark:bg-dark-level-two text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <span className="md:hidden"></span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-500 dark:bg-dark-level-one">
              {inventoryMoveable.map((project) => (
                <tr
                  key={project.item_id}
                  className={classNames(
                    project.item_name
                      ?.toLowerCase()
                      .includes(toReducer.searchInput.toLowerCase().trim()) ||
                      project.item_customname
                        ?.toLowerCase()
                        .includes(toReducer.searchInput.toLowerCase().trim()) ||
                        project.item_wear_name
                          ?.toLowerCase()
                          .includes(toReducer.searchInput?.toLowerCase().trim())
                      ? ''
                      : 'hidden',
                    'hover:shadow-inner'
                  )}
                >
                  <StorageRow projectRow={project} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default function ToContent() {
  return (
    <Router>
      <Route path="/" component={StorageUnits} />
    </Router>
  );
}
