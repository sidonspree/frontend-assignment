import { useEffect, useState, useRef } from "react"
import { Pagination } from "../../common/Pagination";
import { ProjectTable } from "../ProjectTable";
import styles from './Home.module.css'
import { KICKSTARTER_PROJECTS_URL } from "../../constant";

export const Home = () => {

    const [projectData, setProjectData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const pageCount = useRef(null);

    const lastRecordIndex = currentPage * 5;
    const firstRecordIndex = lastRecordIndex - 5;

    useEffect(() => {
        async function fetchProjects() {
            const data = await fetch(KICKSTARTER_PROJECTS_URL);
            const response = await data.json();
            const requiredInfo = response.map((project) => {
                const { "s.no": serialNumber, "percentage.funded": percentageFunded, "amt.pledged": amtPledged } = project;
                return {
                    serialNumber,
                    percentageFunded,
                    amtPledged
                }
            });
            setProjectData(requiredInfo)
            pageCount.current = Math.ceil(requiredInfo.length / 5);
        }
        fetchProjects();
    }, [])

    return (<div className={styles.container}>
        <ProjectTable projectData={projectData.slice(firstRecordIndex, lastRecordIndex)} />
        {projectData.length > 0 && <Pagination onNavigate={page => setCurrentPage(page)}
            totalRecords={projectData.length}
            currentPage={currentPage}
            pageSize={5} />}
    </div>)
}