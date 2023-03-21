import { FC } from 'react'
import ReactPaginate from 'react-paginate'

import styles from "./Pagination.module.scss"

type Props = {
   currentPage: number,
   onChangePage: (page: number) => void
}

const Pagination: FC<Props> = ({ currentPage, onChangePage }) => {
   return (
      <ReactPaginate
         className={styles.root}
         breakLabel="..."
         previousLabel="<"
         nextLabel=">"
         onPageChange={(e) => onChangePage(e.selected + 1)}
         pageRangeDisplayed={5}
         pageCount={3}
         forcePage={currentPage - 1}
      />
   )
}

export default Pagination