import React, { FC, useState } from 'react';
import { Diary } from '../../interfaces/diary.interface';
import http from '../../services/api';
import { updateDiary } from './diariesSlice';
import {
  setCanEdit,
  setActiveDiaryId,
  setCurrentlyEditing,
} from '../entry/editorSlice';
import { showAlert } from '../../util';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store';


interface Props {
  diary: Diary;
};


const buttonStyle: React.CSSProperties = {
  fontSize: '0.7em',
  margin: '0 0.5em',
};


const DiaryTile: FC<Props> = (props) => {
  const [diary, setDiary] = useState(props.diary);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  const totalEntries = props.diary?.entryIds?.length;

  const saveChanges = () => {
    http
      .put<Diary, Diary>(`/diaries/${diary.id}`, diary)
      .then((diary) => {
        if (diary) {
          dispatch(updateDiary(diary));
          showAlert('Saved!', 'success');
        }
      })
      .finally(() => {
        setIsEditing(false);
      });
  };

  return (
    <div className="diary-tile">
      <h2
        className="title"
        title="Click to edit"
        onClick={() => setIsEditing(true)}
        style={{
          cursor: 'pointer',
        }}
      >
        {isEditing ? (
          <input
            value={diary.title}
            onChange={(e) => {
              setDiary({
                ...diary,
                title: e.target.value,
              });
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                saveChanges();
              }
            }}
          />
        ) : (
          <span>{diary.title}</span>
        )}
      </h2>
      <p className="subtitle">{totalEntries ?? '0'} saved entries</p>
      <div style={{ display: 'flex' }}>
        <button
          style={buttonStyle}
          onClick={() => {
            dispatch(setCanEdit(true));
            dispatch(setActiveDiaryId(diary.id as string));
            dispatch(setCurrentlyEditing(null));
          }}
        >
          Add New Entry
        </button>
        <Link to={`diary/${diary.id}`} style={{ width: '100%' }}>
          <button className="secondary" style={buttonStyle}>
            View all &rarr;
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DiaryTile;
// In this file, we receive a diary object as a prop and display the data in our component. 
// Notice that we use local state and component props for our data display here. That’s because 
// you don’t have to manage all your app’s state using Redux. Sharing data using props, and 
// maintaining local state in your components is acceptable and encouraged in some cases.
// Next, let’s create a component that will display a list of a diary’s entries, with the last 
// updated entries at the top of the list. Ensure you are in the src/features/diary directory, 
// then create a file named DiaryEntriesList.tsx and add the following code to the file: