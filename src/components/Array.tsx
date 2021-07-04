import React from 'react';
import { useForm } from 'react-hook-form';

export type ArrayNode = {
  value: number;
  selected: boolean;
  sorted: boolean;
};

type FormData = {
  minimum: number;
  maximum: number;
  length: number;
};

export type ArrayProps = {
  text: string;
  onExecute: (array: ArrayNode[]) => ArrayNode[];
};

const Array: React.FC<ArrayProps> = (props: ArrayProps) => {
  const [array, setArray] = React.useState<ArrayNode[]>();

  function randomizeArray(data: FormData): void {
    const { minimum, maximum, length } = data;

    console.log('minimum: ', minimum);
    console.log('maximum: ', maximum);
    let newArray: ArrayNode[] = [];
    for (let i = 0; i < length; i++) {
      newArray.push({
        value: Math.floor(Math.random() * (maximum - minimum + 1) + minimum),
        selected: false,
        sorted: false,
      });
    }
    console.log(newArray);
    setArray(newArray);
  }

  React.useEffect(() => {
    randomizeArray({ minimum: 1, maximum: 100, length: 50 });
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const { onExecute } = props;

  return (
    <React.Fragment>
      <div className="px-2 py-4 flex flex-col">
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

          <label>
            Length
            <input
              defaultValue={50}
              {...register('length')}
              className="px-2 py-1 border-2 w-12 ml-2 my-2"
            />
          </label>
          {errors.length && <span>This field is required</span>}
          {/* errors will return when field validation fails  */}

          <button
            type="submit"
            className="bg-gray-400 rounded text-semibold text-white px-2 py-1 ml-4">
            Generate
          </button>
        </form>
        <div className="flex flex-row" style={{ height: 250 }}>
          {array?.map((node: ArrayNode, index: number) => (
            <div
              key={index}
              className={`mt-auto bg-${
                node.selected ? 'blue' : node.sorted ? 'green' : 'gray'
              }-500`}
              style={{
                height: `${(1 / getValues().maximum) * 200 * node.value}px`,
                width: `${(1 / getValues().length) * 1000}px`,
              }}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Array;
