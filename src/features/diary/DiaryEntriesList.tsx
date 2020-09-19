import React, { FC, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import http from '../../services/api';
import { Entry } from '../../interfaces/entry.interface';
import { setEntries } from '../entry/entriesSlice';
import { setCurrentlyEditing, setCanEdit } from '../entry/editorSlice';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../store';


const DiaryEntriesList: FC = () => {
  const { entries } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const { id }: any = useParams();

  useEffect(() => {
    if (id != null) {
      http
        .get<null, { entries: Entry[] }>(`/diaries/entries/${id}`)
        .then(({ entries: _entries }) => {
          if (_entries) {
            const sortByLastUpdated = _entries.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(setEntries(sortByLastUpdated));
          }
        });
    }
  }, [id, dispatch]);


  return (
    <div className="entries">
      <header>
        <Link to="/"><h3>&larr; Go Back</h3></Link>
      </header>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id} onClick={() => { dispatch(setCurrentlyEditing(entry)); dispatch(setCanEdit(true));}}>
            {entry.title}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default DiaryEntriesList;
// Here, we subscribe to the entries property of our app’s state, and have our effect fetch a 
// diary’s entry only run when a property, id, changes. This property’s value is gotten from our 
// URL as a path parameter using the useParams() hook from react-router. In the next step, we will 
// create a component that will enable users to create and view diaries, as well as render a diary’s 
// entries when it is in focus.
// Create a file named Diaries.tsx while still in the same directory, and add the following code to the file: