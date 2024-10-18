import Notice from '../Model/NoticeModel.js'; // Adjust the path based on your project structure

// Create a new notice
export const createNotice = async (req, res) => {
    try {
        const notice = new Notice({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            videoUrl: req.body.videoUrl,
            pdfUrl: req.body.pdfUrl
        });

        const savedNotice = await notice.save();
        res.status(201).json(savedNotice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all notices
export const getAllNotices = async (req, res) => {
    try {
        const notices = await Notice.find();
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single notice by ID
export const getNoticeById = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }
        res.status(200).json(notice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a notice
export const updateNotice = async (req, res) => {
    try {
        const updatedNotice = await Notice.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                videoUrl: req.body.videoUrl,
                pdfUrl: req.body.pdfUrl
            },
            { new: true } // Return the updated document
        );

        if (!updatedNotice) {
            return res.status(404).json({ message: 'Notice not found' });
        }
        res.status(200).json(updatedNotice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a notice
export const deleteNotice = async (req, res) => {
    try {
        const notice = await Notice.findByIdAndDelete(req.params.id);
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }
        res.status(200).json({ message: 'Notice deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
