import { motion } from "framer-motion";
import Router from 'next/router'
const withTransition = (OriginalComponent, props) => {
    return () => (
        <>
            <OriginalComponent {...props} />
            <motion.div
                className="slide-in"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 0 }}
                exit={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
            />
            <motion.div
                className="slide-out"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
            />
        </>
    );
};

export default withTransition;