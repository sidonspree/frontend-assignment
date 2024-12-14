import PropTypes from 'prop-types';
import { TABLE_HEADINGS } from './constant';
import styles from './ProjectTable.module.css'



export const ProjectTable = ({ projectData }) => {


    return <table tabIndex={0} role='table' aria-label='Kickstarter projects' className={styles.tableContainer}>
        <thead>
            <tr className={styles.tableHeading} tabIndex={0}>
                {
                    Object.values(TABLE_HEADINGS).map((heading) => (<th  key={heading} scope='col'>{heading}</th>))
                }
            </tr>
        </thead>
        <tbody>
            {
                projectData.map(({ serialNumber, percentageFunded, amtPledged }) => {
                    return <tr key={serialNumber} className={styles.tableRow} tabIndex={0}>
                        <td>{serialNumber}</td>
                        <td>{percentageFunded}</td>
                        <td>{amtPledged}</td>
                    </tr>
                })
            }
        </tbody>
    </table>
}

ProjectTable.propTypes = {
    projectData: PropTypes.arrayOf(
        PropTypes.shape({
            serialNumber: PropTypes.number.isRequired,
            percentageFunded: PropTypes.number.isRequired,
            amtPledged: PropTypes.number.isRequired,
        })
    ).isRequired,
};
