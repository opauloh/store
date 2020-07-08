import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "./List";
import { handleAddGoal, handleDeleteGoal } from "../actions/goals";

export default function Goals() {
  const input = useRef('');
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals);

  const addItem = (e) => {
    e.preventDefault();
    dispatch(handleAddGoal(input.current.value, () => input.current.value = ''));
  };

  const removeItem = (goal) => dispatch(handleDeleteGoal(goal));

  return (
    <div>
      <h1>Goals</h1>
      <input
        type="text"
        placeholder="Add Goal"
        ref={input}
      />
      <button onClick={addItem}>Add Goal</button>
      <List items={goals} remove={removeItem} />
    </div>
  );
}
