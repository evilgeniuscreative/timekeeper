// Vite-based React app entry point
import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Autocomplete,
} from '@mui/material';
import axios from 'axios';

export default function TimekeepingDashboard() {
    const [entries, setEntries] = useState([]);
    const [stats, setStats] = useState({});
    const [searchDate, setSearchDate] = useState(null);

    useEffect(() => {
        axios.get('/api/stats.php').then((res) => setStats(res.data));
        axios.get('/api/entries.php').then((res) => setEntries(res.data));
    }, []);

    const filteredEntries = searchDate
        ? entries.filter((e) => e.date === searchDate)
        : entries;

    return (
        <Container>
            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mt={4}
            >
                <Typography variant='h4'>Timekeeping</Typography>
                <Box textAlign='right'>
                    <Typography variant='subtitle1'>
                        <strong>Total Hours:</strong> {stats.total_hours}
                    </Typography>
                    <Typography variant='subtitle1'>
                        <strong>Total Pay:</strong> ${stats.total_pay}
                    </Typography>
                    <Typography variant='subtitle1'>
                        <strong>Paid to Date:</strong> ${stats.total_paid}
                    </Typography>
                    <Typography variant='subtitle1'>
                        <strong>Outstanding:</strong> ${stats.outstanding}
                    </Typography>
                    <Typography variant='subtitle1'>
                        <strong>Current Rate:</strong> ${stats.current_rate}
                    </Typography>
                    <Box mt={2}>
                        <a
                            href='/api/export.csv.php'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Export CSV
                        </a>
                    </Box>
                </Box>
            </Box>

            <Box mt={4}>
                <Autocomplete
                    options={[...new Set(entries.map((e) => e.date))]}
                    value={searchDate}
                    onChange={(e, newValue) => setSearchDate(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Filter by Date'
                            variant='outlined'
                        />
                    )}
                />
            </Box>

            <Box
                mt={4}
                component={Paper}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Start</TableCell>
                            <TableCell>Lunch Start</TableCell>
                            <TableCell>Lunch End</TableCell>
                            <TableCell>End</TableCell>
                            <TableCell>Hours</TableCell>
                            <TableCell>Pay</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEntries.map((entry, i) => (
                            <TableRow key={i}>
                                <TableCell>{entry.date}</TableCell>
                                <TableCell>{entry.start_time}</TableCell>
                                <TableCell>{entry.lunch_start}</TableCell>
                                <TableCell>{entry.lunch_end}</TableCell>
                                <TableCell>{entry.end_time}</TableCell>
                                <TableCell>
                                    {Number(entry.hours).toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    ${Number(entry.pay).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Container>
    );
}
