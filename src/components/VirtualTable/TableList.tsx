import React, { useRef, useEffect, useMemo, memo, useTransition } from "react";
import { ItemTypes } from "@/@types/index";

import EditContainer from "./EditContainer";

type TableListProps = {
  data: ItemTypes[];
  showCount: number;
};

enum EditTargetEnum {
  ID = "id",
  NAME = "name",
  AGE = "age",
  EMAIL = "email",
}

const TableList: React.FC<TableListProps> = (props) => {
  const [sliceIndex, setSliceIndex] = React.useState<number>(0);
  const [showCount, setShowCount] = React.useState<number>(props.showCount);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [reactiveData, setReactiveData] = React.useState<ItemTypes[]>([]);

  const [targetId, setTargetId] = React.useState<number>(0);
  const [targetName, setTargetName] = React.useState<string>("");
  const [targetEmail, setTargetEmail] = React.useState<string>("");
  const [targetAge, setTargetAge] = React.useState<number>(0);
  const [isPending, startTransition] = useTransition();

  // initaiize update dependence value
  useEffect(() => {
    setShowCount(props.showCount);
  }, [props.showCount]);

  useEffect(() => {
    setReactiveData(props.data);
  }, [props.data]);

  useEffect(() => {
    const currentScrollRef = scrollRef.current;
    if (props.data.length <= showCount) return;
    currentScrollRef?.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
          setSliceIndex((prev) =>
            prev + 1 >= props.data.length - showCount ? prev : prev + 1
          );
        } else {
          setSliceIndex((prev) => (prev - 1 <= 0 ? 0 : prev - 1));
        }
        const ele = currentScrollRef?.getBoundingClientRect();
        if (currentScrollRef) {
          currentScrollRef.style.maxHeight =
            Math.ceil(ele?.height || 0) + "px";
        }
      },
      {
        capture: false,
      }
    );

    return () => {
      currentScrollRef?.removeEventListener("wheel", () => {});
    };
  }, [scrollRef, props.data, showCount]);

  function buttonFn(isEdit: boolean, index: number, item: ItemTypes) {
    if (isEdit) {
      // save list
      startTransition(() => {
        setReactiveData((prv) => {
          return prv.map((v) =>
            v.id === item.id
              ? { ...v, name: targetName, age: targetAge, email: targetEmail }
              : v
          );
        });

        // reset edit status
        setEditStatus((prv) => prv.map(() => false));
      });
      return;
    }
    // set current item to edit mode
    startTransition(() => {
      setTargetId(item.id);
      setTargetName(item.name);
      setTargetAge(item.age);
      setTargetEmail(item.email);
      setEditStatus((prv) => prv.map((v, i) => (i === index ? true : false)));
    });
  }

  function itemValue(
    isEdit: boolean,
    currentValue: string | number,
    changeValue: string | number
  ) {
    if (isEdit) return changeValue;
    return currentValue;
  }

  function itemHandleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const [type] = event.target.id.split("-");
    const value = event.target.value;

    switch (type) {
      case EditTargetEnum.ID:
        setTargetId(Number(value));
        break;

      case EditTargetEnum.NAME:
        setTargetName(value);
        break;
      case EditTargetEnum.AGE:
        setTargetAge(Number(value));
        break;
      case EditTargetEnum.EMAIL:
        setTargetEmail(value);
        break;
      default:
        break;
    }
  }

  const renderList = useMemo(() => {
    // deep copy data to avoid changing the original data
    const newList = JSON.parse(JSON.stringify(reactiveData)) as ItemTypes[];
    return newList.splice(sliceIndex, showCount);
  }, [reactiveData, sliceIndex, showCount]);

  const [editStatus, setEditStatus] = React.useState<boolean[]>(
    Array.from(new Array(showCount), () => false)
  );

  return (
    <div className="table-container">
      <div className="table-list" ref={scrollRef}>
        {renderList.map((item, index) => (
          <div className="table-item" key={item.id}>
            <EditContainer
              isEdit={editStatus[index]}
              EditComponent={
                <>
                  <span className="item-span">
                    <input
                      type="number"
                      className="inputs"
                      name={`${EditTargetEnum.ID}-${item.id}`}
                      id={`${EditTargetEnum.ID}-${item.id}`}
                      value={itemValue(editStatus[index], item.id, targetId)}
                      onChange={itemHandleChange}
                      disabled
                    />
                  </span>
                  <span className="item-span">
                    <input
                      type="text"
                      className="inputs"
                      name={`${EditTargetEnum.NAME}-${item.id}`}
                      id={`${EditTargetEnum.NAME}-${item.id}`}
                      value={itemValue(
                        editStatus[index],
                        item.name,
                        targetName
                      )}
                      onChange={itemHandleChange}
                      disabled={isPending}
                    />
                  </span>
                  <span className="item-span">
                    <input
                      type="number"
                      className="inputs"
                      name={`${EditTargetEnum.AGE}-${item.id}`}
                      id={`${EditTargetEnum.AGE}-${item.id}`}
                      value={itemValue(editStatus[index], item.age, targetAge)}
                      onChange={itemHandleChange}
                      disabled={isPending}
                    />
                  </span>
                  <span className="item-span">
                    <input
                      type="email"
                      className="inputs"
                      name={`${EditTargetEnum.EMAIL}-${item.id}`}
                      id={`${EditTargetEnum.EMAIL}-${item.id}`}
                      value={itemValue(
                        editStatus[index],
                        item.email,
                        targetEmail
                      )}
                      onChange={itemHandleChange}
                      disabled={isPending}
                    />
                  </span>
                </>
              }
              NormalDisplayComponent={
                <>
                  <span className="item-span">{item.id}</span>
                  <span className="item-span">{item.name}</span>
                  <span className="item-span">{item.age}</span>
                  <span className="item-span">{item.email}</span>
                </>
              }
            />

            <span className="item-span">
              <button
                type="button"
                className="edit-btn"
                onClick={() => buttonFn(editStatus[index], index, item)}
              >
                {editStatus[index] ? "Save" : "Edit"}
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(TableList);
