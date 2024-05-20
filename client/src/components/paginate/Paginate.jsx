import React from "react";
import styles from "./Paginate.module.css";
import { setCurrentPage, setPrevPage, setNextPage } from "../../redux/prodSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";


function Paginado({ cardsInPage, totalCards, currentPage }) {

    const dispatch = useDispatch();
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(totalCards / cardsInPage); i++) {
        pageNumbers.push(i + 1);
    }
    const handleButtonClick = (number) => {
        dispatch(setCurrentPage(number));
    };

    const handlePreviousClick = () => {
        if (currentPage > 1) {
            dispatch(setPrevPage());
        } else {
            Swal.fire({
                title: "Ups... se acabaron las paginas.",
                icon: "warning",
                background: "aliceblue",
                width: "20%",
                heightAuto: false,
                height: "1%",
                padding: "1rem",
                buttonsStyling: false,
                customClass: {
                    title: styles.mesageAlert,
                    confirmButton: styles.buttonAlert,
                },
            });
        }
    };

    const handleNextClick = () => {
        if (currentPage < pageNumbers.length) {
            dispatch(setNextPage());
        } else {
            Swal.fire({
                title: "Ups... se acabaron las paginas.",
                icon: "warning",
                background: "aliceblue",
                width: "20%",
                heightAuto: false,
                height: "1%",
                padding: "1rem",
                buttonsStyling: false,
                customClass: {
                    title: styles.mesageAlert,
                    confirmButton: styles.buttonAlert,
                },
            });
        }
    };

    const handleFirstPageClick = () => {
        dispatch(setCurrentPage(1));
    };
    const handleLastPageClick = () => {
        dispatch(setCurrentPage(pageNumbers.length));
    };

    const visiblePageNumbers = [];
    const maxVisibleButtons = 5;

    if (pageNumbers.length <= maxVisibleButtons) {
        visiblePageNumbers.push(...pageNumbers);
    } else {
        const halfMaxVisibleButtons = Math.floor(maxVisibleButtons / 2);
        const start = Math.max(currentPage - halfMaxVisibleButtons, 1);
        const end = Math.min(start + maxVisibleButtons - 1, pageNumbers.length);

        for (let i = start; i <= end; i++) {
            visiblePageNumbers.push(i);
        }
    }

    return (
        <div>
            <nav>
                {totalCards <= cardsInPage ? null : (
                    <ul className={styles.pagination}>

                        <li
                            className={`${styles.paginationItem} ${currentPage === 1 ? styles.disabledButton : ""
                                }`}
                        >
                            <button
                                className={styles.paginationButton}
                                onClick={handlePreviousClick}
                                disabled={currentPage === 1} // Desactiva el botón si currentPage es 1
                            >
                                🡸
                            </button>
                        </li>
                        {visiblePageNumbers.map((number) => (
                            <li className={styles.paginationItem} key={number}>
                                <button
                                    className={`${styles.paginationButton} ${currentPage === number ? styles.activeButton : ""
                                        }`}
                                    onClick={() => handleButtonClick(number)}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                        <li
                            className={`${styles.paginationItem} ${currentPage === pageNumbers.length ? styles.disabledButton : ""
                                }`}
                        >
                            <button
                                className={styles.paginationButton}
                                onClick={handleNextClick}
                                disabled={currentPage === pageNumbers.length} // Desactiva el botón si currentPage es igual a la última página
                            >
                                🡺
                            </button>
                        </li>

                    </ul>
                )}
            </nav>
        </div>
    );
}

export default Paginado