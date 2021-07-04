import React from 'react';
import { useForm } from 'react-hook-form';

export type ArrayNode = {
  value: number;
  selected: boolean;
  sorted: boolean;
};

type ArrayFormData = {
  minimum: number;
  maximum: number;
  length?: number;
};

type ActionFormData = {
  searchNumber?: number;
};

export type ArrayProps = {
  type: 'sort' | 'search';
  onExecute: (
    // eslint-disable-next-line no-unused-vars
    array: ArrayNode[],
    // eslint-disable-next-line no-unused-vars
    callRender: (array: ArrayNode[]) => void,
    // eslint-disable-next-line no-unused-vars
    searchNumber?: number,
  ) => Promise<void>;
};

const Array: React.FC<ArrayProps> = (props: ArrayProps) => {
  const { type, onExecute } = props;

  const [array, setArray] = React.useState<ArrayNode[]>();
  const [loading, setLoading] = React.useState<boolean>(false);

  function randomizeArray(data: ArrayFormData): void {
    const { minimum, maximum, length } = data;

    let newArray: ArrayNode[] = [];
    // if searching, just have incremental array ex: [1, 2, 3, 4, 5]
    if (type === 'search') {
      for (let i = 0; i < data.maximum; i++) {
        newArray.push({
          value: i + 1,
          selected: false,
          sorted: false,
        });
      }
    }

    // if sorting, have random array of set length
    if (type === 'sort' && !!length) {
      for (let i = 0; i < length; i++) {
        newArray.push({
          value: Math.floor(Math.random() * (maximum - minimum + 1)) + 1,
          selected: false,
          sorted: false,
        });
      }
    }

    setArray(newArray);
  }

  React.useEffect(() => {
    randomizeArray({
      minimum: 1,
      maximum: 100,
      length: type === 'sort' ? 50 : undefined,
    });
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ArrayFormData>();

  const {
    register: actionRegister,
    handleSubmit: handleActionSubmit,
    formState: { errors: actionErrors },
  } = useForm<ActionFormData>();

  async function onActionSubmit(data: ActionFormData): Promise<void> {
    setLoading(true);
    await onExecute(
      // mapping to clone, so useState doesn't cause weird re-renders
      (array ?? []).map((a) => ({ ...a })),
      (updatedArray, isDone?: boolean) => {
        setArray([...updatedArray]);
        if (isDone) setLoading(false);
      },
      data.searchNumber,
    );
  }

  const searchInvalid =
    actionErrors.searchNumber?.type === 'min' ||
    actionErrors.searchNumber?.type === 'max';

  return (
    <React.Fragment>
      <div className="px-2 py-4 flex flex-col items-center">
        {/*Array Manipulation Form*/}
        <form onSubmit={handleSubmit(randomizeArray)}>
          <label>
            Minimum
            <input
              defaultValue={1}
              {...register('minimum', { min: 1 })}
              className="px-2 py-1 border-2 w-12 ml-2 my-2"
            />
          </label>
          {errors.minimum?.type === 'min' && (
            <span className="mx-2 text-small text-red-500">
              Minimum must be at least 1
            </span>
          )}

          <label className="mx-4">
            Maximum
            <input
              defaultValue={100}
              {...register('maximum')}
              className="px-2 py-1 border-2 w-12 ml-2 my-2"
            />
          </label>
          {errors.maximum && <span>This field is required</span>}

          {type === 'sort' && (
            <>
              <label>
                Length
                <input
                  defaultValue={50}
                  {...register('length')}
                  className="px-2 py-1 border-2 w-12 ml-2 my-2"
                />
              </label>
              {errors.length && <span>This field is required</span>}
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`bg-gray-${
              !loading ? '400' : '200'
            } rounded text-semibold text-white px-2 py-1 ml-6`}>
            Generate
          </button>
        </form>
        <div className="flex flex-row mx-auto w-full" style={{ height: 250 }}>
          {array?.map((node: ArrayNode, index: number) => (
            <div
              key={index}
              style={{
                height: `${(1 / getValues().maximum) * 200 * node.value}px`,
                width: `${
                  (1 /
                    (getValues().length ?? getValues().maximum - getValues().minimum)) *
                  1000
                }px`,
              }}
              className={`mt-auto bg-${
                node.selected ? 'blue' : node.sorted ? 'green' : 'gray'
              }-500`}
            />
          ))}
        </div>
        <form onSubmit={handleActionSubmit(onActionSubmit)} className="mt-2">
          {type === 'search' && (
            <>
              <label>
                Search For
                <input
                  defaultValue={50}
                  {...actionRegister('searchNumber', {
                    min: getValues('minimum'),
                    max: getValues('maximum'),
                  })}
                  className="px-2 py-1 border-2 w-12 ml-2 my-2"
                />
              </label>
              {searchInvalid && (
                <span className="mx-2 text-small text-red-500">
                  Search Number must be between {getValues('minimum')} and{' '}
                  {getValues('maximum')}
                </span>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`bg-green-${
              !loading ? '400' : '200 animate-pulse'
            } rounded text-semibold text-white px-2 py-1 mt-2 ml-4 w-24`}>
            {type === 'search' ? 'Search' : 'Sort'}
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Array;
