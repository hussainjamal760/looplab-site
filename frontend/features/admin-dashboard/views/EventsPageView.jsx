'use client';

import {
    useMemo,
    useState,
} from 'react';

import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Loader2,
    Plus,
} from 'lucide-react';

import {
    useCreateAdminEventMutation,
    useGetAdminEventsQuery,
    useToggleEventBannerMutation,
} from '@/store/api/adminApi';


const LOOPVERSE_FORM_FIELDS = [
    {
        fieldId: 'fullName',
        label: 'Full Name',
        fieldType: 'text',
        options: [],
        isRequired: true,
        placeholder:
            'Enter your full name',
        order: 1,
    },
    {
        fieldId: 'email',
        label: 'Email Address',
        fieldType: 'email',
        options: [],
        isRequired: true,
        placeholder:
            'you@example.com',
        order: 2,
    },
    {
        fieldId: 'phone',
        label: 'Phone Number',
        fieldType: 'text',
        options: [],
        isRequired: true,
        placeholder:
            '+92 300 1234567',
        order: 3,
    },
    {
        fieldId: 'university',
        label: 'University / Institute',
        fieldType: 'text',
        options: [],
        isRequired: true,
        placeholder:
            'Enter university name',
        order: 4,
    },
    {
        fieldId: 'department',
        label: 'Department / Degree',
        fieldType: 'text',
        options: [],
        isRequired: true,
        placeholder:
            'For example: Computer Science',
        order: 5,
    },
    {
        fieldId: 'trackSelect',
        label: 'Choose Your Track',
        fieldType: 'dropdown',
        options: [
            'Artificial Intelligence',
            'Web Development',
            'Cybersecurity',
            'UI/UX Design',
            'Open Innovation',
        ],
        isRequired: true,
        placeholder:
            'Select a track',
        order: 6,
    },
    {
        fieldId: 'attendanceMode',
        label: 'Attendance Mode',
        fieldType: 'radio',
        options: [
            'Virtual',
            'Onsite',
        ],
        isRequired: true,
        placeholder: '',
        order: 7,
    },
    {
        fieldId: 'needsParking',
        label: 'Do you require parking?',
        fieldType: 'checkbox',
        options: [],
        isRequired: false,
        placeholder: '',
        order: 8,
    },
];


const INITIAL_FORM = {
    title: 'Loopverse 3.0',
    slug: 'loopverse-3',
    description:
        'LoopLab’s flagship technology event bringing together builders, innovators and communities to build, compete and connect.',

    category: 'Hackathon',
    eventDate: '2026-10-09T09:00',
    venue: 'CEGA, Lahore, Pakistan',
    baseFee: '0',

    isActive: true,
    showOnBanner: true,
};


const inputStyle = {
    width: '100%',
    padding: '13px 14px',

    color: '#17111f',
    background: '#ffffff',

    border: '2px solid #201625',
    borderRadius: '12px',

    font: 'inherit',
    fontWeight: 650,

    outline: 'none',
    boxSizing: 'border-box',
};


const labelStyle = {
    display: 'block',

    marginBottom: '7px',

    color: '#32283a',

    fontSize: '0.75rem',
    fontWeight: 900,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
};


function getErrorMessage(error) {
    if (error?.data?.errors?.length) {
        return error.data.errors
            .map((item) =>
                `${item.field || 'Field'}: ${item.message}`
            )
            .join(', ');
    }

    return (
        error?.data?.message ||
        error?.error ||
        'Unable to create the event.'
    );
}


export default function EventsPageView({
    onBack,
}) {
    const [form, setForm] =
        useState(INITIAL_FORM);

    const [successMessage, setSuccessMessage] =
        useState('');

    const [formError, setFormError] =
        useState('');

    const {
        data: events = [],
        isLoading: eventsLoading,
        isError: eventsError,
        refetch,
    } = useGetAdminEventsQuery();

    const [
        createEvent,
        {
            isLoading: creatingEvent,
        },
    ] = useCreateAdminEventMutation();

    const [
        toggleBanner,
        {
            isLoading: changingBanner,
        },
    ] = useToggleEventBannerMutation();


    const slugAlreadyExists = useMemo(
        () =>
            events.some(
                (event) =>
                    event.slug ===
                    form.slug.trim()
            ),
        [events, form.slug]
    );


    function updateField(event) {
        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setForm((current) => ({
            ...current,

            [name]:
                type === 'checkbox'
                    ? checked
                    : value,
        }));
    }


    async function handleSubmit(event) {
        event.preventDefault();

        setSuccessMessage('');
        setFormError('');

        if (slugAlreadyExists) {
            setFormError(
                'An event with this slug already exists.'
            );

            return;
        }

        try {
            const payload = {
                title:
                    form.title.trim(),

                slug:
                    form.slug
                        .trim()
                        .toLowerCase(),

                description:
                    form.description.trim(),

                category:
                    form.category,

                eventDate:
                    form.eventDate
                        ? new Date(
                              form.eventDate
                          ).toISOString()
                        : null,

                venue:
                    form.venue.trim(),

                baseFee:
                    Number(form.baseFee),

                isActive:
                    Boolean(form.isActive),

                formFields:
                    LOOPVERSE_FORM_FIELDS,
            };

            const createdEvent =
                await createEvent(
                    payload
                ).unwrap();

            const createdEventId =
                createdEvent?._id;

            if (
                form.showOnBanner &&
                createdEventId
            ) {
                await toggleBanner({
                    id: createdEventId,
                    isLiveBanner: true,
                }).unwrap();
            }

            setSuccessMessage(
                'Loopverse event created successfully.'
            );

            refetch();
        } catch (error) {
            setFormError(
                getErrorMessage(error)
            );
        }
    }


    async function handleBannerChange(
        eventId,
        currentValue
    ) {
        try {
            setFormError('');

            await toggleBanner({
                id: eventId,
                isLiveBanner:
                    !currentValue,
            }).unwrap();
        } catch (error) {
            setFormError(
                getErrorMessage(error)
            );
        }
    }


    return (
        <div
            style={{
                position: 'relative',
                paddingBottom: '50px',
            }}
        >
            {/* Header */}

            <div
                className="db-header-row"
                style={{
                    position: 'relative',
                }}
            >
                <div>
                    <button
                        type="button"
                        onClick={onBack}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',

                            marginBottom: '13px',
                            padding: 0,

                            color: '#6c2bd9',
                            background: 'none',
                            border: 'none',

                            cursor: 'pointer',
                            fontWeight: 850,
                        }}
                    >
                        <ArrowLeft size={17} />
                        Dashboard
                    </button>

                    <h1 className="db-header-title">
                        Event Management
                    </h1>

                    <p className="db-header-subtitle">
                        Create and manage
                        LoopLab registration events.
                    </p>
                </div>
            </div>


            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'minmax(0, 1.25fr) minmax(280px, 0.75fr)',

                    gap: '22px',
                    alignItems: 'start',
                }}
            >
                {/* Create event form */}

                <form
                    onSubmit={handleSubmit}
                    style={{
                        padding: '25px',

                        background: '#ffffff',

                        border:
                            '2px solid #201625',
                        borderRadius: '24px',

                        boxShadow:
                            '7px 7px 0 #6c2bd9',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '22px',
                        }}
                    >
                        <Plus
                            size={23}
                            color="#6c2bd9"
                        />

                        <h2
                            style={{
                                margin: 0,
                                color: '#17111f',
                            }}
                        >
                            Create Event
                        </h2>
                    </div>


                    {formError && (
                        <div
                            style={{
                                marginBottom:
                                    '18px',
                                padding:
                                    '12px 14px',

                                color: '#7a1723',
                                background:
                                    '#ffe4e7',

                                border:
                                    '2px solid #a22a38',
                                borderRadius:
                                    '11px',

                                fontWeight: 750,
                            }}
                        >
                            {formError}
                        </div>
                    )}


                    {successMessage && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems:
                                    'center',
                                gap: '8px',

                                marginBottom:
                                    '18px',
                                padding:
                                    '12px 14px',

                                color: '#174d36',
                                background:
                                    '#def8e9',

                                border:
                                    '2px solid #277554',
                                borderRadius:
                                    '11px',

                                fontWeight: 800,
                            }}
                        >
                            <CheckCircle2
                                size={19}
                            />

                            {successMessage}
                        </div>
                    )}


                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(2, minmax(0, 1fr))',

                            gap: '17px',
                        }}
                    >
                        <div>
                            <label style={labelStyle}>
                                Event title
                            </label>

                            <input
                                style={inputStyle}
                                name="title"
                                value={form.title}
                                onChange={updateField}
                                required
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>
                                Event slug
                            </label>

                            <input
                                style={inputStyle}
                                name="slug"
                                value={form.slug}
                                onChange={(event) =>
                                    setForm(
                                        (current) => ({
                                            ...current,

                                            slug:
                                                event.target.value
                                                    .toLowerCase()
                                                    .replace(
                                                        /[^a-z0-9-]/g,
                                                        ''
                                                    ),
                                        })
                                    )
                                }
                                required
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>
                                Category
                            </label>

                            <select
                                style={inputStyle}
                                name="category"
                                value={
                                    form.category
                                }
                                onChange={
                                    updateField
                                }
                            >
                                <option value="Hackathon">
                                    Hackathon
                                </option>

                                <option value="Workshop">
                                    Workshop
                                </option>

                                <option value="Summit">
                                    Summit
                                </option>
                            </select>
                        </div>

                        <div>
                            <label style={labelStyle}>
                                Event date
                            </label>

                            <input
                                style={inputStyle}
                                type="datetime-local"
                                name="eventDate"
                                value={
                                    form.eventDate
                                }
                                onChange={
                                    updateField
                                }
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>
                                Venue
                            </label>

                            <input
                                style={inputStyle}
                                name="venue"
                                value={form.venue}
                                onChange={updateField}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>
                                Base fee (PKR)
                            </label>

                            <input
                                style={inputStyle}
                                type="number"
                                name="baseFee"
                                min="0"
                                value={form.baseFee}
                                onChange={updateField}
                                required
                            />
                        </div>
                    </div>


                    <div
                        style={{
                            marginTop: '17px',
                        }}
                    >
                        <label style={labelStyle}>
                            Description
                        </label>

                        <textarea
                            style={{
                                ...inputStyle,
                                minHeight: '110px',
                                resize: 'vertical',
                            }}
                            name="description"
                            value={
                                form.description
                            }
                            onChange={updateField}
                        />
                    </div>


                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '20px',

                            marginTop: '18px',
                            padding: '15px',

                            background: '#f5edff',

                            border:
                                '1px solid #d2b6f1',
                            borderRadius:
                                '12px',
                        }}
                    >
                        <label
                            style={{
                                display: 'flex',
                                alignItems:
                                    'center',
                                gap: '8px',

                                cursor: 'pointer',
                                fontWeight: 800,
                            }}
                        >
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={
                                    form.isActive
                                }
                                onChange={
                                    updateField
                                }
                            />

                            Registration active
                        </label>

                        <label
                            style={{
                                display: 'flex',
                                alignItems:
                                    'center',
                                gap: '8px',

                                cursor: 'pointer',
                                fontWeight: 800,
                            }}
                        >
                            <input
                                type="checkbox"
                                name="showOnBanner"
                                checked={
                                    form.showOnBanner
                                }
                                onChange={
                                    updateField
                                }
                            />

                            Show on live banner
                        </label>
                    </div>


                    <div
                        style={{
                            marginTop: '18px',
                            padding: '15px',

                            color: '#41364a',
                            background: '#e9f9d1',

                            border:
                                '1px solid #b9da86',
                            borderRadius:
                                '12px',
                        }}
                    >
                        <strong>
                            Registration form
                            fields included:
                        </strong>

                        <p
                            style={{
                                margin:
                                    '6px 0 0',
                                lineHeight: 1.6,
                            }}
                        >
                            Full name, email,
                            phone, university,
                            department, track,
                            attendance mode and
                            parking requirement.
                        </p>
                    </div>


                    <button
                        type="submit"
                        disabled={
                            creatingEvent ||
                            changingBanner
                        }
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent:
                                'center',
                            gap: '9px',

                            width: '100%',
                            marginTop: '22px',
                            padding:
                                '14px 18px',

                            color: '#ffffff',
                            background:
                                '#6c2bd9',

                            border:
                                '2px solid #201625',
                            borderRadius:
                                '999px',

                            boxShadow:
                                '4px 4px 0 #201625',

                            cursor:
                                creatingEvent
                                    ? 'wait'
                                    : 'pointer',

                            fontSize: '1rem',
                            fontWeight: 900,
                        }}
                    >
                        {creatingEvent ? (
                            <>
                                <Loader2
                                    size={18}
                                />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Plus size={18} />
                                Create Loopverse Event
                            </>
                        )}
                    </button>
                </form>


                {/* Existing events */}

                <section
                    style={{
                        padding: '22px',

                        background:
                            'rgba(255, 255, 255, 0.87)',

                        border:
                            '2px solid #201625',
                        borderRadius: '22px',

                        boxShadow:
                            '6px 6px 0 #201625',
                    }}
                >
                    <h2
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '9px',

                            margin:
                                '0 0 18px',
                        }}
                    >
                        <CalendarDays
                            size={21}
                        />

                        Existing Events
                    </h2>


                    {eventsLoading && (
                        <p>
                            Loading events...
                        </p>
                    )}


                    {eventsError && (
                        <p
                            style={{
                                color: '#a12536',
                                fontWeight: 750,
                            }}
                        >
                            Events could not be
                            loaded.
                        </p>
                    )}


                    {!eventsLoading &&
                        !eventsError &&
                        events.length === 0 && (
                            <div
                                style={{
                                    padding:
                                        '20px',

                                    color:
                                        '#675b70',
                                    background:
                                        '#f5f0f8',

                                    borderRadius:
                                        '13px',
                                    textAlign:
                                        'center',
                                }}
                            >
                                No events have
                                been created yet.
                            </div>
                        )}


                    <div
                        style={{
                            display: 'grid',
                            gap: '13px',
                        }}
                    >
                        {events.map(
                            (event) => (
                                <article
                                    key={
                                        event._id
                                    }
                                    style={{
                                        padding:
                                            '15px',

                                        background:
                                            '#ffffff',

                                        border:
                                            '1.5px solid #34283d',
                                        borderRadius:
                                            '13px',
                                    }}
                                >
                                    <h3
                                        style={{
                                            margin:
                                                '0 0 5px',
                                        }}
                                    >
                                        {
                                            event.title
                                        }
                                    </h3>

                                    <p
                                        style={{
                                            margin:
                                                '0 0 11px',
                                            color:
                                                '#766a7e',
                                            fontSize:
                                                '0.82rem',
                                        }}
                                    >
                                        /
                                        {
                                            event.slug
                                        }
                                    </p>

                                    <div
                                        style={{
                                            display:
                                                'flex',
                                            flexWrap:
                                                'wrap',
                                            gap: '7px',
                                        }}
                                    >
                                        <span
                                            style={{
                                                padding:
                                                    '5px 9px',

                                                background:
                                                    event.isActive
                                                        ? '#ddf8e8'
                                                        : '#eee9f1',

                                                borderRadius:
                                                    '999px',

                                                fontSize:
                                                    '0.7rem',
                                                fontWeight:
                                                    850,
                                            }}
                                        >
                                            {event.isActive
                                                ? 'Registration active'
                                                : 'Inactive'}
                                        </span>

                                        <button
                                            type="button"
                                            disabled={
                                                changingBanner
                                            }
                                            onClick={() =>
                                                handleBannerChange(
                                                    event._id,
                                                    event.isLiveBanner
                                                )
                                            }
                                            style={{
                                                padding:
                                                    '5px 9px',

                                                color:
                                                    event.isLiveBanner
                                                        ? '#ffffff'
                                                        : '#422c4e',

                                                background:
                                                    event.isLiveBanner
                                                        ? '#6c2bd9'
                                                        : '#eadcf7',

                                                border:
                                                    'none',
                                                borderRadius:
                                                    '999px',

                                                cursor:
                                                    'pointer',

                                                fontSize:
                                                    '0.7rem',
                                                fontWeight:
                                                    850,
                                            }}
                                        >
                                            {event.isLiveBanner
                                                ? 'Live banner on'
                                                : 'Set live banner'}
                                        </button>
                                    </div>
                                </article>
                            )
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}