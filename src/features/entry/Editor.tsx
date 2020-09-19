import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import Markdown from 'markdown-to-jsx';
import http from '../../services/api';
import { Entry } from '../../interfaces/entry.interface';
import { Diary } from '../../interfaces/diary.interface';
import { setCurrentlyEditing, setCanEdit } from './editorSlice';
import { updateDiary } from '../diary/diariesSlice';
import { updateEntry } from './entriesSlice';
import { showAlert } from '../../util';
import { useAppDispatch } from '../../store';


const Editor: FC = () => {
  const { currentlyEditing: entry, canEdit, activeDiaryId } = useSelector(
    (state: RootState) => state.editor
  );

  const [editedEntry, updateEditedEntry] = useState(entry);
  const dispatch = useAppDispatch();

  const saveEntry = async () => {
    if (activeDiaryId == null) {
      return showAlert('Please select a diary.', 'warning');
    }
    if (entry == null) {
      http.post<Entry, { diary: Diary; entry: Entry }>(
          `/diaries/entry/${activeDiaryId}`,
          editedEntry
        )
        .then((data) => {
          if (data != null) {
            const { diary, entry: _entry } = data;
            dispatch(setCurrentlyEditing(_entry));
            dispatch(updateDiary(diary));
          }
        });
    } else {
      http.put<Entry, Entry>(`diaries/entry/${entry.id}`, editedEntry)
        .then((_entry) => {
          if (_entry != null) {
            dispatch(setCurrentlyEditing(_entry));
            dispatch(updateEntry(_entry));
          }
        });
    }
    dispatch(setCanEdit(false));
  };

  useEffect(() => {
    updateEditedEntry(entry);
  }, [entry]);


  return (
    <div className="editor">
      <header
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: '0.2em',
          paddingBottom: '0.2em',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        {entry && !canEdit ? (
          <h4>
            {entry.title}
            <a href="#edit" onClick={(e) => { e.preventDefault();
                if (entry != null) {
                  dispatch(setCanEdit(true));
                }
              }}
              style={{ marginLeft: '0.4em' }}
            >
              (Edit)
            </a>
          </h4>
        ) : (
          <input
            value={editedEntry?.title ?? ''}
            disabled={!canEdit}
            onChange={(e) => {
              if (editedEntry) {
                updateEditedEntry({
                  ...editedEntry,
                  title: e.target.value,
                });
              } else {
                updateEditedEntry({
                  title: e.target.value,
                  content: '',
                });
              }
            }}
          />
        )}
      </header>
      {entry && !canEdit ? (
        <Markdown>{entry.content}</Markdown>
      ) : (
        <>
          <textarea
            disabled={!canEdit}
            placeholder="Supports markdown!"
            value={editedEntry?.content ?? ''}
            onChange={(e) => {
              if (editedEntry) {
                updateEditedEntry({
                  ...editedEntry,
                  content: e.target.value,
                });
              } else {
                updateEditedEntry({
                  title: '',
                  content: e.target.value,
                });
              }
            }}
          />
          <button onClick={saveEntry} disabled={!canEdit}>
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default Editor;
// Let’s break down what’s happening in the Editor component.
// First, we are picking some values (with correctly inferred types) from the app’s state using the useSelector() 
// hook from react-redux. In the next line, we have a stateful value called editedEntry whose initial value is 
// set to the editor.currentlyEditing property we’ve selected from the store.
// Next, we have the saveEntry function which updates or creates a new entry in the API, and dispatches 
// the respective Redux action.
// Finally, we have a useEffect that is fired when the editor.currentlyEditing property changes. 
// Our editor’s UI (in the component’s return function) has been set up to respond to changes in the state. 
// For example, rendering the entry’s content as JSX elements when the user isn’t editing.
// With that, the app’s Entry feature should be completely set up. In the next section, we will 
// finish building the Diary feature and then import the main components in the Home component we created earlier.