import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classnames from 'classnames';
import { GoodList } from './GoodList';

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABET = 'alphabet';
const SORT_ASCENDING = '1';
const SORT_DESCENDING = '2';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

function sortItems(goods, { sortType, queue = '1' }) {
  const items = [...goods];

  if (sortType) {
    // eslint-disable-next-line array-callback-return,consistent-return
    items.sort((a, b) => {
      switch (sortType) {
        case SORT_BY_ALPHABET:
          if (queue === SORT_ASCENDING) {
            return a.localeCompare(b);
          }

          if (queue === SORT_DESCENDING) {
            return b.localeCompare(a);
          }

          break;

        case SORT_BY_LENGTH:
          if (queue === SORT_ASCENDING) {
            return a.length - b.length;
          }

          if (queue === SORT_DESCENDING) {
            return b.length - a.length;
          }

          break;

        // eslint-disable-next-line no-fallthrough
        default:
          return 0;
      }
    });
  }

  return items;
}

export const App = () => {
  const [queueField, setQueueField] = useState(SORT_ASCENDING);
  const [sortField, setSortField] = useState('');
  const visibleGoods = sortItems(goodsFromServer, {
    sortType: sortField,
    queue: queueField,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames('button', 'is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
          onClick={() => {
            setSortField(SORT_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames('button', 'is-warning', {
            'is-light': queueField === SORT_ASCENDING,
          })}
          onClick={() => {
            // eslint-disable-next-line no-unused-expressions
            queueField === SORT_DESCENDING
              ? setQueueField(SORT_ASCENDING)
              : setQueueField(SORT_DESCENDING);
          }}
        >
          Reverse
        </button>

        {sortField && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setQueueField(SORT_ASCENDING);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
