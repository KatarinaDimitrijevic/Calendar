import Cell from '../Cell';
import Modal from '../Modal';
import CreateEventForm from '../CreateEventForm';
import { useState } from 'react';
import styles from './calendar.module.css';
import { VisibilityContext } from '../../Helper/Context';

const dates = [
  ['', '1', '2', '3', '4', '5', '6'],
  ['7', '8', '9', '10', '11', '12', '13'],
  ['14', '15', '16', '17', '18', '19', '20'],
  ['21', '22', '23', '24', '25', '26', '27'],
  ['28', '29', '30', '31', '', '', ''],
];

const Calendar = ({ meetings }) => {
  const [visible, setVisible] = useState(false);
  const [day, setDay] = useState('');

  return (
    <div className={styles.calendar}>
      <h2 className={styles.title}>August 2022.</h2>
      <table>
        <thead>
          <tr>
            <td className={styles.tableHeader}>Sunday</td>
            <td className={styles.tableHeader}>Monday</td>
            <td className={styles.tableHeader}>Tuesday</td>
            <td className={styles.tableHeader}>Wedneday</td>
            <td className={styles.tableHeader}>Thursday</td>
            <td className={styles.tableHeader}>Friday</td>
            <td className={styles.tableHeader}>Saturday</td>
          </tr>
        </thead>

        <tbody>
          {dates.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index}>
                  {cell === '' ? (
                    <></>
                  ) : (
                    <div
                      onDoubleClick={() => {
                        setVisible(true);
                        setDay(cell);
                      }}
                    >
                      <Cell
                        date={cell}
                        meetings={meetings.filter((m) => {
                          const tmpDate = new Date(m.date);
                          if (tmpDate.getDate() === Number.parseInt(cell)) {
                            return true;
                          }

                          return false;
                        })}
                      ></Cell>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <VisibilityContext.Provider value={{ visible, setVisible }}>
        {visible ? (
          <Modal>
            <CreateEventForm day={day}></CreateEventForm>
          </Modal>
        ) : (
          <></>
        )}
      </VisibilityContext.Provider>
    </div>
  );
};

export default Calendar;
