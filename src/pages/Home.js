import React, { useState } from 'react';
import { 
    Container, 
    Typography, 
    Paper, 
    TextField, 
    Button, 
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    CircularProgress,
    Alert,
    IconButton
} from '@mui/material';
import { generateRandomPerson } from '../services/dataService';
import { motion } from 'framer-motion';
import FloatingSphere from '../components/FloatingSphere';
import styled from 'styled-components';
import AIChat from '../components/AIChat';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px; // Space between buttons
  margin-bottom: 20px;
  align-items: center; // Align buttons vertically
`;

const StyledButton = styled.button`
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const BackButton = styled(IconButton)`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  
  &:hover {
    background: rgba(0, 0, 0, 0.4);
    color: white;
  }
`;

const formatDate = (dateString) => {
  const match = dateString.match(/\((.*?)\)/);
  if (!match) return dateString;
  
  const date = new Date(match[1]);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).replace(/(\d+)/, '$1th'); // Add 'th' suffix to the day
};

const Home = () => {
    const [formData, setFormData] = useState({
        age: '',
        country: ''
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openChatDialog, setOpenChatDialog] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const person = await generateRandomPerson(parseInt(formData.age), formData.country);
            setResult(person);
            setOpenDialog(true);
        } catch (err) {
            setError(err.message);
            alert(`Failed to generate person: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setResult(null);
    };

    return (
        <Container>
            <Box sx={{ minHeight: '100vh', pt: 10, pb: 4 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography variant="h2" component="h1" gutterBottom>
                        As-Salamu Alaikum
                    </Typography>
                </motion.div>

                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        gap: '40px',
                        position: 'relative',
                        '& .MuiDialog-paper': {
                            width: '90vw',
                            height: '90vh',
                            maxWidth: '90vw',
                            maxHeight: '90vh'
                        }
                    }}
                >
                    {/* AI Chat Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{ flex: '1', cursor: 'pointer' }}
                        onClick={() => setOpenChatDialog(true)}
                    >
                        <Paper
                            sx={{
                                p: 4,
                                mt: 20,
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
                                borderRadius: '20px',
                                '&:hover': {
                                    boxShadow: '0 8px 32px rgba(255, 255, 255, 0.2)',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                },
                                height: '100%'
                            }}
                        >
                            <AIChat />
                        </Paper>
                    </motion.div>

                    {/* Random Person Generator Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{ flex: '1' }}
                    >
                        <Paper
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                p: 4,
                                mt: 4,
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
                                borderRadius: '20px',
                                '&:hover': {
                                    boxShadow: '0 8px 32px rgba(255, 255, 255, 0.2)',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                },
                                '& .MuiTextField-root': {
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(255, 255, 255, 0.5)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'rgba(255, 255, 255, 0.7)',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'rgba(255, 255, 255, 0.7)',
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'rgba(255, 255, 255, 0.9)',
                                    },
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Age"
                                type="number"
                                margin="normal"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'rgba(147, 112, 219, 0.5)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(147, 112, 219, 0.8)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#9370DB',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'rgba(147, 112, 219, 0.8)',
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                select
                                label="Country"
                                margin="normal"
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                required
                                SelectProps={{
                                    native: true,
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'rgba(147, 112, 219, 0.5)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(147, 112, 219, 0.8)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#9370DB',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'rgba(147, 112, 219, 0.8)',
                                    },
                                }}
                            >
                                <option value="">Select a country</option>
                                <option value="us">USA</option>
                                <option value="ca">Canada</option>
                                <option value="gb">UK</option>
                            </TextField>
                            <ButtonContainer>
                                <Button 
                                    component="a" // Change to anchor tag
                                    href="https://forms.gle/3m8veagMgjZnKUCS8"
                                    target="_blank"
                                    sx={{ 
                                        background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                                        color: 'white',
                                        padding: '12px 24px',
                                        fontSize: '1.1rem',
                                        textTransform: 'none',
                                        borderRadius: '10px',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #FF8E53, #FF6B6B)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 8px 20px rgba(255, 107, 107, 0.4)',
                                        },
                                    }}
                                >
                                    Dollar Exchange
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    fullWidth 
                                    sx={{ 
                                        mt: 3,
                                        background: 'linear-gradient(45deg, #9370DB 30%, #8A2BE2 90%)',
                                        color: 'white',
                                        padding: '12px',
                                        fontSize: '1.1rem',
                                        textTransform: 'none',
                                        borderRadius: '10px',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #8A2BE2 30%, #9370DB 90%)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 8px 32px rgba(147, 112, 219, 0.4)',
                                        },
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Generate Random Person'}
                                </Button>
                            </ButtonContainer>
                            
                            {loading && (
                                <Typography 
                                    sx={{ 
                                        mt: 2, 
                                        textAlign: 'center', 
                                        color: '#E6E6FA',
                                        fontStyle: 'italic',
                                        opacity: 0.8
                                    }}
                                >
                                    Hold on you Human! Ghost is coming with the best result for you...
                                </Typography>
                            )}
                        </Paper>
                    </motion.div>
                </Box>

                {/* Enhanced Chat Dialog */}
                <Dialog 
                    open={openChatDialog} 
                    onClose={() => setOpenChatDialog(false)}
                    fullScreen
                    PaperProps={{
                        sx: {
                            background: '#000000',
                            backdropFilter: 'blur(20px)',
                            border: 'none',
                            margin: 0,
                            width: '100vw',
                            height: '100vh',
                            maxWidth: '100vw',
                            maxHeight: '100vh',
                            borderRadius: 0,
                            overflow: 'hidden'
                        }
                    }}
                >
                    <DialogContent 
                        sx={{ 
                            p: 0, 
                            height: '100vh',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        <BackButton
                            onClick={() => setOpenChatDialog(false)}
                            aria-label="back to home"
                        >
                            <ArrowBackIcon />
                        </BackButton>
                        <Box sx={{ 
                            flexGrow: 1,
                            height: '100%',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            <AIChat isExpanded={true} />
                        </Box>
                    </DialogContent>
                </Dialog>

                <Dialog 
                    open={openDialog} 
                    onClose={handleCloseDialog}
                    PaperProps={{
                        sx: {
                            background: 'rgba(75, 0, 130, 0.9)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(147, 112, 219, 0.3)',
                            borderRadius: '20px',
                            padding: '20px',
                        }
                    }}
                >
                    <DialogTitle sx={{ color: '#E6E6FA' }}>Generated Person</DialogTitle>
                    <DialogContent>
                        {result && (
                            <DialogContentText component="div" sx={{ color: '#E6E6FA' }}>
                                <Typography sx={{ mb: 1 }}><strong>Name:</strong> {result.name}</Typography>
                                <Typography sx={{ mb: 1 }}><strong>Age:</strong> {result.age.split(' ')[0]} ({formatDate(result.age)})</Typography>
                                <Typography sx={{ mb: 1 }}><strong>Country:</strong> {result.country}</Typography>
                                <Typography sx={{ mb: 1 }}><strong>Address:</strong> {result.address}</Typography>
                                <Typography sx={{ mb: 1 }}><strong>City:</strong> {result.city}</Typography>
                                <Typography sx={{ mb: 1 }}><strong>State:</strong> {result.state}</Typography>
                                <Typography><strong>ZIP Code:</strong> {result.zip}</Typography>
                            </DialogContentText>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={handleCloseDialog}
                            sx={{
                                color: '#E6E6FA',
                                '&:hover': {
                                    background: 'rgba(147, 112, 219, 0.2)',
                                }
                            }}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default Home; 