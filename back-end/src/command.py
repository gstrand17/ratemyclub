from models import *
from app import app

# Define CLI commands
@app.cli.command('db_create')  # Command line word to do something
def db_create():
    db.create_all()  # Create all tables in the database
    print('Database created!')


@app.cli.command('db_drop')
def db_drop():
    db.drop_all()  # Method from SQLAlchemy
    print('Database dropped!')


@app.cli.command('db_seed')  # Starter data
def db_seed():
    sample_review1 = ClubReviews(review_num=1, user_email="gstrand@ufl.edu", club_name="3D Printing Club", date="10-2-2022",
                                 review_text="omg I love this club", overall_rating=4, soc_rating = 5, acad_rating = 2,
                                 exec_rating = 5, comlev = 4, current_mem = True, time_mem = "4 semesters", paid = False, thumbs=0, flagged=False, liked_by=[])
    sample_review2 = ClubReviews(user_email="jimin@ufl.edu", club_name="3D Printing Club", date="March 2024",
                                 review_text="this was the worst club I've ever gone to", overall_rating=0, soc_rating = 1,
                                 acad_rating = 2, exec_rating = 1, comlev = 5, current_mem = True, time_mem = "4 semesters", paid = False,
                                 thumbs=0, flagged=False)
    sample_review2 = ClubReviews(review_num=2, user_email="jimin@ufl.edu", club_name="3D Printing Club", date="3-4-2024",
                                 review_text="this was the worst club I've ever gone to", overall_rating=5, soc_rating = 5,
                                 acad_rating = 2, exec_rating = 5, comlev = 5, current_mem = True, time_mem = "1 semester",
                                 paid = False, thumbs=0, flagged=False)
    sample_review3 = ClubReviews(review_num=3,user_email="gstrand@ufl.edu", club_name="3D Printing Club", date="4-6-2024",
                                 review_text="I never want to leave this club. I love everyone so much", overall_rating = 5,
                                 soc_rating = 5, acad_rating=3, exec_rating=5, comlev = 5, current_mem = True, time_mem = "8 semesters",
                                 paid = False, thumbs=0, flagged=False)
    sample_review4 = ClubReviews(review_num=4,user_email="ehargrave@ufl.edu", club_name="3D Printing Club", date="10-10-2024",
                                 review_text="learned that 3d printing is about the friends u make along the way.", overall_rating = 5,
                                 soc_rating = 5, acad_rating=4, exec_rating=5, comlev = 1, current_mem = False, time_mem = "2 semesters",
                                 paid = False, thumbs=0, flagged=False)
    sample_review5 = ClubReviews(review_num=5,user_email="ehargrave@ufl.edu", club_name="A Reason to Give", date="2-4-2024",
                                 review_text="absolutely so slay found so many reasons to give", overall_rating = 4.5,
                                 soc_rating = 4, acad_rating=3, exec_rating=4, comlev = 2, current_mem = True, time_mem = "2 semesters",
                                 paid = False, thumbs=0, flagged=False)
    sample_review6 = ClubReviews(review_num=6,user_email="ehargrave@ufl.edu", club_name="A Reason to Give", date="11-11-2024",
                                 review_text="never found the reason for giving...", overall_rating = 1,
                                 soc_rating = 4, acad_rating=1, exec_rating=1, comlev = 4, current_mem = False, time_mem = "1 semester",
                                 paid = False, thumbs=0, flagged=False, liked_by=[])
    student_guest = User(email='guest@ufl.edu', username='guest', password='coding123',
                       first_name='Guest', last_name='Guest', student=True, club_exec=False, admin=False,
                       clubs='', passkey=None)
    student_test = User(email='test@ufl.edu', username='test', password='test',
                          first_name='Test', last_name='User', student=True, club_exec=False, admin=False,
                          clubs='', passkey=None)
    student_jungkook = User(email='jungkook@ufl.edu', username='Jungkook', password='coding123',
                       first_name='Jung-kook', last_name='Jeon', student=True, club_exec=False, admin=False,
                       clubs='', passkey=None)
    student_jhope = User(email='jhope@ufl.edu', username='J-Hope', password='coding123',
                       first_name='Ho-seok', last_name='Jung', student=True, club_exec=False, admin=False,
                       clubs='', passkey=None)
    student_v = User(email='v@ufl.edu', username='V', password='coding123',
                       first_name='Tae-hyung', last_name='Kim', student=True, club_exec=False, admin=False,
                       clubs='', passkey=None)
    student_jimin = User(email='jimin@ufl.edu', username='Jimin', password='coding123',
                       first_name='Ji-min', last_name='Park', student=True, club_exec=False, admin=False,
                       clubs='', passkey=None)
    student_suga = User(email='suga@ufl.edu', username='Suga', password='coding123',
                       first_name='Yoon-gi', last_name='Min', student=True, club_exec=False, admin=False,
                       clubs='', passkey=None)
    student_jin = User(email='jin@ufl.edu', username='Jin', password='coding123',
                        first_name='Seok-joong', last_name='Kim', student=True, club_exec=False, admin=False,
                        clubs='', passkey=None)
    student_rm = User(email='rm@ufl.edu', username='RM', password='coding123',
                        first_name='Nam-joon', last_name='Kim', student=True, club_exec=False, admin=False,
                        clubs='', passkey=None)
    student_lisa = User(email='lisa@ufl.edu', username='Lisa', password='coding123',
                        first_name='Lalisa', last_name='Manoban', student=True, club_exec=False, admin=False,
                        clubs='', passkey=None)
    student_jennie = User(email='jennie@ufl.edu', username='Jennie', password='coding123',
                        first_name='Jennie', last_name='Kim', student=True, club_exec=False, admin=False,
                        clubs='', passkey=None)
    student_rose = User(email='rose@ufl.edu', username='Rose', password='coding123',
                          first_name='Roseanne', last_name='Park', student=True, club_exec=False, admin=False,
                          clubs='', passkey=None)
    student_jisoo = User(email='jisooe@ufl.edu', username='Jisoo', password='coding123',
                          first_name='Ji-soo', last_name='Kim', student=True, club_exec=False, admin=False,
                          clubs='', passkey=None)
    clubExec_guestExec = User(email='guestExec@ufl.edu', username='guestExec', password='coding123',
                          first_name='Chandini', last_name='GuestExec', student=False, club_exec=True, admin=False,
                          clubs='3D Printing Club', passkey=None)
    admin_julio = User(email='julioarboleda@ufl.edu', username='julio', password='coding123',
                     first_name='Julio', last_name='Arboleda', student=False, club_exec=False, admin=True,
                     clubs='', passkey=1277)
    admin_graciela = User(email='gstrand@ufl.edu', username='graciela', password='coding123',
                       first_name='Graciela', last_name='Strand', student=False, club_exec=False, admin=True,
                       clubs='', passkey=9237)
    admin_natalie = User(email='n.poche@ufl.edu', username='natalie', password='coding123',
                       first_name='Natalie', last_name='Poche', student=False, club_exec=False, admin=True,
                       clubs='', passkey=3629)
    admin_erin = User(email='ehargrave@ufl.edu', username='erin', password='coding123',
                       first_name='Erin', last_name='Hargrave', student=False, club_exec=False, admin=True,
                       clubs='', passkey=2509)
    admin = User(email='admin@ufl.edu', username='admin', password='admin',
                       first_name='admin', last_name='admin', student=False, club_exec=False, admin=True,
                       clubs='', passkey=0000)
    club1 = ClubDirectory(club_name='3D Printing Club', tags='engineering|', avg_overall_rating=0.0,
                          avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, avg_comlev=0.0, active_mem=0,
                          description='A student organization at the University of Florida striving to educate students '
                                      'on the world of 3D printing',
                          link='https://www.instagram.com/3dprintuf/')
    club2 = ClubDirectory(club_name='A Reason to Give', tags='volunteering|', avg_overall_rating=0.0,
                          avg_soc_rating=4.0, avg_acad_rating=4.0, avg_exec_rating=4.9, avg_comlev=3.5, active_mem=0,
                          description='Dedicated to overcoming the stigmas surrounding homelessness through the '
                                      'empowering gift of a sandwich!',
                          link='https://www.instagram.com/areasontogive/')
    club3 = ClubDirectory(club_name='Accent A Cappella', tags='performing arts|', avg_comlev=0, avg_overall_rating=0.0,
                          avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                          description='',
                          link='https://www.instagram.com/nsaccent/')
    club4 = ClubDirectory(club_name='Adaa', tags='performing arts|', avg_overall_rating=0.0,
                          avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                          description='University of Florida’s Premier Co-ed Competitive Fusion Dance Team',
                          link='https://www.instagram.com/gatoradaa/?hl=en')
    club5 = ClubDirectory(club_name='Admissions Outreach Ambassadors', tags='dental|', avg_overall_rating=0.0,
                          avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                          description='Admissions Outreach Ambassadors serve as the official student representatives for the University of Florida College of Dentistry Office of Admissions at admissions recruitment events and programming.',
                          link='https://dental.ufl.edu/education/sai/student-involvement/student-organizations/admissions-outreach-ambassadors/')
    club6 = ClubDirectory(club_name='Adventist Christian Fellowship', tags='religious', avg_overall_rating=0.0,
                          avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                          description='We are a diverse student community at UF. We gather together throughout the year to: Experience God, Share Love, Connect Lives and Declare Truth!',
                          link='https://www.instagram.com/ufacf/?hl=en')
    club7 = ClubDirectory(club_name='Advertising Society', tags='business|professional dev|', avg_overall_rating=0.0,
                          avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                          description='',
                          link='https://www.instagram.com/ufadsociety/?hl=en')
    club8 = ClubDirectory(club_name='African Student Union', tags='cultural|', avg_overall_rating=0.0,
                          avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                          description='Founded to support and unite African students and to promote awareness of African issues to all students and the Gainesville community',
                          link='https://www.instagram.com/uf_asu/')
    club9 = ClubDirectory(club_name='Agricultural and Life Sciences College Council', tags='agriculture|',
                          avg_overall_rating=0.0,
                          avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                          description='The CALS Council provides leadership for CALS students and student organizations. '
                                      'The council stimulates interest among students in the agricultural and life sciences, supports and promotes CALS student organizations, '
                                      'provides programs of interest and relevance to CALS students, and promotes communication between CALS faculty and students. ',
                          link='https://cals.ufl.edu/getinvolved/calscouncil/')
    club10 = ClubDirectory(club_name='AI in Healthcare Club', tags='engineering|medicine|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='We aim to inform students about the uses of AI in healthcare and provide opportunities to engage in it!',
                           link='https://www.instagram.com/rcsi_aiclub/')
    club11 = ClubDirectory(club_name='Alpha Epsilon Delta', tags='greek life|medicine|professional dev|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Alpha Epsilon Delta (Florida Alpha Chapter) is one of the University of Florida\'s most respected organizations '
                                       'and ranked the #1 chapter in the U.S. We are a pre-professional honor society dedicated to providing unique community service '
                                       'opportunities and guidance throughout the undergraduate process.UF ΑΕΔ\'s purpose is to make it easier for pre-health students '
                                       'to attain their lifelong goal: Becoming A Health Professional.',
                           link='https://www.aeduf.org/')
    club12 = ClubDirectory(club_name='Alpha Epsilon Lambda (AEL)', tags='greek life|graduate|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Alpha Epsilon Lambda (AEL) is the prestigious honor society for graduate and professional school students at the University of Florida. '
                                       'It recognizes students who are in the top 35% of their college and no more than 1% of these students are accepted each year. '
                                       'AEL is the FIRST and ONLY academic honor society dedicated to the recognition of excellence among graduate and professional school students, '
                                       'regardless of academic discipline.',
                           link='https://aeluf.wordpress.com/')
    club13 = ClubDirectory(club_name='Alpha Kappa Psi', tags='greek life|business|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Alpha Kappa Psi is a Professional Co-ed Business Fraternity founded in 1904 with the purpose of developing its members into principled business leaders.',
                           link='https://florida.akpsi.org/')
    club14 = ClubDirectory(club_name='Alpha Phi Omega', tags='greek life|volunteering|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Alpha Phi Omega is a co-ed national service organization. Our cardinal principles include leadership, friendship, and service. '
                                       'We aim to serve the community and the university while forming lasting friendship and developing leadership skills.',
                           link='https://www.apotau.org/')
    club15 = ClubDirectory(club_name='Alpha Psi Fraternity, Xi Chapter', tags='greek life|animal science|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description=' Alpha Psi is a national veterinary fraternity. The mission of Alpha Psi Fraternity, '
                                       'Xi Chapter is to provide a venue for social interaction between students, faculty, and staff, '
                                       'to promote a stronger bond between the veterinary colleges, and to participate in community outreach events.',
                           link='https://alphapsiuf.square.site/')
    club16 = ClubDirectory(club_name='Alpha Zeta', tags='greek life|agriculture|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Alpha Zeta is an honorary, professional society for students and industry professionals in the agriculture and natural resources fields. ',
                           link='https://cals.ufl.edu/getinvolved/alphazeta/')
    club17 = ClubDirectory(club_name='American Cancer Society on Campus', tags='medicine|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='A UF student-led organization that aims to spread awareness about cancer, its prevention, & support service options',
                           link='https://www.instagram.com/acsocuf/')
    club18 = ClubDirectory(club_name='American College of Clinical Pharmacy',
                           tags='medicine|pharmacy|professional dev|graduate|',
                           avg_overall_rating=0.0, avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0,
                           active_mem=0,
                           description='American College of Clinical Pharmacology® (ACCP) is a scientific community that offers equal support and '
                                       'opportunities to all Members to interact, learn and progress in their scientific careers '
                                       'and to promote clinical pharmacology in research, drug development and patient care. From Students & '
                                       'Trainees to Early-stage Professionals and established professional colleagues, ACCP offers the tools '
                                       'and support you need to achieve professional success. ',
                           link='https://graduateeducation.pharmacy.ufl.edu/students/american-college-of-clinical-pharmacology-student-chapter/')
    club19 = ClubDirectory(club_name='American Institute of Aeronautics and Astronautics',
                           tags='engineering|professional dev|',
                           avg_overall_rating=0.0, avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0,
                           active_mem=0,
                           description='UF AIAA offers students the opportunity to enhance their education and experience through design teams, '
                                       'social activities, community service, mentorship,speakers, company tours, regional council meetings, and national conferences and competitions. '
                                       'We aim to provide students with exposure to professors, student interns, and professionals from all facets of the aerospace industry – '
                                       'and to connect students with research, scholarship, and internship opportunities to advance their careers to new levels. ',
                           link='https://mae.ufl.edu/students/organizations/aiaa/')
    club20 = ClubDirectory(club_name='American Institute of Architecture Students',
                           tags='architecture|professional dev|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The purpose of AIAS is to promote excellence in architecture education, training, '
                                       'and practice, to foster an appreciation of architecture and related disciplines, '
                                       'to enrich communities in a spirit of collaboration, and to organize students and '
                                       'combine their efforts to advance the art and science of architecture.',
                           link='https://www.instagram.com/aiasuf/?hl=en')
    club21 = ClubDirectory(club_name='American Institute of Chemical Engineers', tags='engineering|professional dev|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The American Institute of Chemical Engineers (AIChE) is the largest national organization for chemical engineers '
                                       'with 60,000 members from over 110 countries. Since its foundation in 1908, AIChE has strived to aid chemical engineers professionally. '
                                       'UF AIChE is your ChemE home. Join us in a multitude of activities ranging from intramurals and socials to various chemical competitions. '
                                       'Joining the UF AIChE is your first step towards a career as a chemical engineer!',
                           link='https://www.instagram.com/ufaiche/')
    club22 = ClubDirectory(club_name='American Marketing Association', tags='business|professional dev|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The University of Florida Chapter of the American Marketing Association (UF-AMA) is a student organization '
                                       'dedicated to providing hands-on business experience for students of all majors. '
                                       'At UF-AMA, we believe in learning by doing. Our workshops, case competitions, '
                                       'and collaborative projects offer practical insights into the dynamic field of marketing. '
                                       'Whether you are a business major, graphic design enthusiast, or psychology student interested in consumer behavior, '
                                       'there is a place for you here.',
                           link='https://www.amagator.com/')
    club23 = ClubDirectory(club_name='American Meteorological Society', tags='earth science', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='',
                           link='https://www.instagram.com/amsatuf/')
    club24 = ClubDirectory(club_name='American Pharmacists Association - Academy of Student Pharmacists - Gainesville',
                           tags='medicine|pharmacy|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The American Pharmacist Association – Academy of Student Pharmacists, or APhA-ASP, '
                                       'is the student section of the American Pharmacist Association, representing over 18,000 '
                                       'students at all colleges of pharmacy in the United States and Puerto Rico.',
                           link='https://aphaasp.pharmacy.ufl.edu/')
    club25 = ClubDirectory(club_name='American Physician Scientists Association', tags='medicine|professional dev|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The purpose of the American Physician Scientist Association is to foster research training and '
                                       'career development for students who have an interest in building part of their career around basic, '
                                       'translational, epidemiological, or clinical research. Our local chapter is interested in providing opportunities '
                                       'for students interested in research at all levels to meet and learn from successful physician-scientists and others here at UF '
                                       'who could serve as advisors and mentors. We are also interested in giving students who are actively conducting '
                                       'research an opportunity to present their findings to their peers.',
                           link='https://mcc.med.ufl.edu/committees/apsa/')
    club26 = ClubDirectory(club_name='American Society for Microbiology, Student Chapter', tags='biology|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Welcome to the official website for the American Society for Microbiology (ASM), Student Chapter at the University of Florida! '
                                       'We are a student-led organization dedicated to growing the microbiology community for undergraduate students at UF. '
                                       'Our mission is to foster a deeper connection to microbiology within our student body and '
                                       'the broader UF community by providing enriching learning and career opportunities. '
                                       'We achieve this by offering valuable resources for students to get more involved in microbiology, '
                                       'including research presentations, career talks, and professional development workshops. ',
                           link='https://asmgators.wixsite.com/home')
    club27 = ClubDirectory(club_name='American Society of Civil Engineers', tags='engineering|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Join a family of civil and environmental engineers at the University of Florida. Grow as a leader, mentor, and engineer.',
                           link='https://gatorasce.weebly.com/')
    club28 = ClubDirectory(club_name='American Society of Landscape Architects - Student Chapter ',
                           tags='architecture|professional dev|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Our mission is to create a supportive and inclusive community for future landscape architects '
                                       'and allied professionals who share a passion for design, sustainability, and social responsibility.',
                           link='https://www.instagram.com/uf.scasla/')
    club29 = ClubDirectory(club_name='American Society of Mechanical Engineers', tags='engineering|professional dev|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The American Society of Mechanical Engineers is a student organization that promotes social, professional, and technical development of our members. '
                                       'Social development is achieved through a variety of planned events, such as barbecue cookouts and athletic events. '
                                       'Professional development is achieved through technical workshops, professional guest speakers from various mechanical engineering companies, '
                                       'and through tours of companies that include Exactech and Disney Imagineering. At the forefront of ASME are our 5 technical design teams '
                                       'which cater to different interests in mechanical engineering. Each team competes in a competition at the end of the year with schools around the country.',
                           link='https://www.instagram.com/asmeuf/')
    club30 = ClubDirectory(club_name='American Student Dental Association', tags='dental', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='',
                           link='https://www.instagram.com/ufasda/')
    club31 = ClubDirectory(club_name='Animal Science Graduate Student Association', tags='animal science|graduate|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The Animal Sciences Graduate Student Association (ASGSA) is active in promoting career development, '
                                       'academic success, and social interaction between graduate students and faculty. '
                                       'Each year ASGSA sponsors a number of events including the professional seminar series which brings in speakers from academia, '
                                       'industry, and other career options to the department; social events such as tailgates, happy hours, '
                                       'and the Annual Cook-off, and fundraisers that support student travel grants and other activities of the organization. ',
                           link='https://animal.ifas.ufl.edu/graduate/asgsa/')
    club32 = ClubDirectory(club_name='Apollodorus Chapter of Alpha Rho Chi Fraternity, Inc.',
                           tags='greek life|architecture|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='',
                           link='https://www.instagram.com/apx_apollodorus/?hl=en')
    club33 = ClubDirectory(club_name='Aquatic Animal Health Club', tags='animal science|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The UF Aquatic Animal Health Club, which consists of both Aquatic Animal Medicine Certificate '
                                       'and other UF College of Veterinary Medicine (UF CVM) students, provides educational '
                                       'and networking opportunities for UF CVM students in the field of aquatic animal medicine.',
                           link='https://ufaahc.square.site/')
    club34 = ClubDirectory(club_name='Arab Students\' Association', tags='cultural|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='',
                           link='https://www.instagram.com/ufarabsa/?hl=en')
    club35 = ClubDirectory(club_name='Architrave', tags='architecture|publication|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='',
                           link='https://www.ufarchitrave.com/')
    club36 = ClubDirectory(club_name='Argentine Student Association', tags='cultural|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The Argentinian student association is a club dedicated to spreading and promoting Argentinian culture '
                                       'throughout UF campus. We welcome people of all backgrounds and cover topics ranging from spoken slang to food to historical information. '
                                       'Some of our most famous events are our mate y facturas , chocotorta game night, and our final event of the semester the ARSAdo '
                                       'which is a traditional Argentinian barbecue. We are all about promoting social interaction amongst people of '
                                       'all backgrounds as we spread our love and passion for the roots that we were raised on.',
                           link='https://www.instagram.com/arsa_uf/?hl=en')
    club37 = ClubDirectory(club_name='Art History Association', tags='arts|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='',
                           link='https://www.instagram.com/aha_uf/?hl=en')
    club38 = ClubDirectory(club_name='Arts in Health ', tags='arts|medicine|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Promoting mental, physical, and emotional health to our members and the greater Gainesville community through the use of the arts',
                           link='https://www.instagram.com/artsinhealthuf/?hl=en')
    club39 = ClubDirectory(club_name='AscenDance Salsa Company', tags='performing arts|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='AscenDance aims to focus on the various styles of salsa dancing, ensuring that all classes are taught by high caliber instructors. '
                                       'The goal is to create a student base that has fun dancing while being good dancers at any level, '
                                       'ultimately creating a community of confident, respectful, and talented dancers, among various styles of Latin dance.',
                           link='https://www.ascendancesalsa.com/')
    club40 = ClubDirectory(club_name='Asian American Student Union', tags='cultural|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='',
                           link='https://www.instagram.com/ufaasu/?hl=en')
    club41 = ClubDirectory(club_name='Asian Business Student Association', tags='cultural|business|professional dev|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Asian-interest business organization at UF focused on practicing professional development.',
                           link='https://www.instagram.com/uf.absa/')
    club42 = ClubDirectory(club_name='Asian Student Pharmacists Coalition', tags='cultural|medicine|pharmacy|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='',
                           link='https://www.instagram.com/aspcoalition/')
    club43 = ClubDirectory(club_name='Assemble Ballet Company', tags='performing arts|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The University of Florida’s student-run ballet company',
                           link='https://www.instagram.com/assembleballetco/?hl=en')
    club44 = ClubDirectory(club_name='Associated Builders and Contractors', tags='construction|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The purpose of Associated Builders and Contractors is to promote academic '
                                       'and career related opportunities within the construction industry. '
                                       'The ABC student chapter provides our members with hands on speaker series events from industry professionals '
                                       'and access to network outside the classroom and within the industry.',
                           link='')
    club45 = ClubDirectory(club_name='Association for Computing Machinery', tags='engineering|professional dev|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Largest Pre-Professional CS Community at UF. We work to answer the question "Where do I go?"'
                                       'in the modern tech space by highlighting career paths, opportunities, and specializations!'
                                       'We prepare our members for industry with worshops on Resumes, LinkedIn, Internship, '
                                       'and anything you need to secure that job! We engage our members with technical experiences'
                                       'through our workshops and design team!',
                           link='https://www.instagram.com/uf.acm/')
    club46 = ClubDirectory(club_name='Association for Law and Business', tags='law|business|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The mission of the UF Association for Law & Business (ALB) is to expand the vision '
                                       'and network of its business-oriented membership and to equip member with the technical skills, '
                                       'social skills, and professional relationships to afford them the ability of capitalize on '
                                       'traditional and non-traditional opportunities presented throughout their professional careers.',
                           link='https://www.instagram.com/ufalb/?hl=en')
    club47 = ClubDirectory(club_name='Association for Tax Law', tags='law|professional dev|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='University of Florida Levin College of Law\'s Association for Tax Law (ATL) brings together students '
                                       'interested in tax and connects them with the professional opportunities available to tax lawyers. '
                                       'UF Law\'s Graduate Tax Program has earned a reputation as one of the country\'s finest, '
                                       'which allows ATL to provide a forum for practitioners, academics, and policymakers to '
                                       'expand the conversation around tax law.',
                           link='https://www.linkedin.com/company/association-for-tax-law')
    club48 = ClubDirectory(club_name='Association of Computer Engineers', tags='engineering|professional dev|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='',
                           link='https://www.instagram.com/ace_uf/')
    club49 = ClubDirectory(club_name='Association of Latino Professionals in Finance and Accounting',
                           tags='business|professional dev|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='',
                           link='https://www.instagram.com/alpfaatuf/')
    club50 = ClubDirectory(club_name='Astronomy and Astrophysics Society', tags='physics|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='',
                           link='https://www.instagram.com/ufastroclub/')
    club51 = ClubDirectory(club_name='Baking4Wellness', tags='awareness|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Promoting mental & general health awareness through the art of baking',
                           link='https://www.instagram.com/ufbaking4wellness/')
    club52 = ClubDirectory(club_name='Balkan Student Association', tags='cultural|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='',
                           link='https://www.instagram.com/bksauf/')
    club53 = ClubDirectory(club_name='Bangladeshi Students\' Association', tags='cultural|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The Bangladeshi Students\' Association at UF works to promote awareness '
                                       'and appreciation of Bangladesh at the University of Florida and in the Gainesville community, '
                                       'through community-based projects and the celebration of various social and cultural activities!',
                           link='https://ufbsa.org/')
    club54 = ClubDirectory(club_name='Baptist Collegiate Ministries', tags='religious|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='We exist to see the students at the University of Florida and Santa Fe College come to know Jesus, '
                                       'walk with them tomaturity, and send them out as reproducing disciple makers. ',
                           link='https://www.ufbcm.org/')
    club55 = ClubDirectory(club_name='Beta Alpha Psi', tags='greek life|business|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='We are the Upsilon Chapter of Beta Alpha Psi, an honor society for accounting, '
                                       'finance, and information systems students. Since our founding in 1938, '
                                       'we have been dedicated to promoting the core objectives and missions of Beta Alpha Psi. '
                                       'We strive to better ourselves, our academic and future careers, our school, and our community.',
                           link='https://www.bapatuf.com/')
    club56 = ClubDirectory(club_name='Beta Iota Chapter of the Alpha Chi Sigma Fraternity',
                           tags='greek life|chemistry|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Alpha Chi Sigma is the nation’s only co-ed Professional Chemistry Fraternity. '
                                       'Having been founded at the University of Wisconsin at Madison in 1902, '
                                       'this academic organization has inducted over 70,000 members in its lifetime, '
                                       'bringing together both men and women from a wide variety of chemistry-related disciplines.',
                           link='https://sites.google.com/view/alphachisigmauf')
    club57 = ClubDirectory(club_name='Beta Xi Chapter of Tau Beta Sigma',
                           tags='greek life|performing arts|volunteering|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='We are the Beta Xi chapter of Tau Beta Sigma, a National Honorary Service Sorority for members '
                                       'of the college bands. The Beta Xi chapter proudly serves the University of Florida bands '
                                       'and promotes the performance and appreciation of music throughout the Gainesville community. '
                                       'We are comprised of members of the UF bands who have been selected for passion for '
                                       'and commitment within the university band programs.',
                           link='https://tbsbetaxi.wixsite.com/home')
    club58 = ClubDirectory(club_name='Big Sister Little Sister Mentoring Program',
                           tags='cultural|professional development|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Strive to inspire ALL women to remain empowered through mentorship and live life with a purpose ',
                           link='https://www.instagram.com/uf_bsls/?hl=en')
    club59 = ClubDirectory(club_name='Biomedical Engineering Society', tags='biology|engineering|professional dev|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='UF BMES is a professional organization that will allow students to Create Change '
                                       'in local projects that not only give back to the community, but advance themselves '
                                       'Professionally, Academically, and provide Genuine Quality to their own lives.',
                           link='https://sites.google.com/view/ufbmes/home')
    club60 = ClubDirectory(club_name='Black Graduate Student Organization', tags='cultural|graduate|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The Black Graduate Student Organization (BGSO) is an interdisciplinary, multi-ethnic organization '
                                       'that is dedicated to identifying and addressing the needs of graduate and professional students of African, '
                                       'African American, or Afro Caribbean descent at the University of Florida. Founded in 1975 '
                                       'with a rich tradition deeply rooted in advocacy, BGSO aims to enhance the graduate experience of its members '
                                       'by offering academic and professional support, providing opportunities for community outreach and service, '
                                       'in addition to cultivating professional development and academic excellence. ',
                           link='https://www.instagram.com/ufbgso/?hl=en')
    club61 = ClubDirectory(club_name='Black Law Students Association W. George Allen Chapter',
                           tags='cultural|law|professional dev|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The Black Law Students Association (BLSA) at UF Law is a group of students committed to '
                                       'strengthening the bonds of friendship and community while fostering an environment '
                                       'for students of color to excel academically and professionally.',
                           link='https://www.facebook.com/BLSAatUF/')
    club62 = ClubDirectory(club_name='Black Student Advocacy Group', tags='cultural|dental|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='BSAG serves UFCD students by providing a space where Black students can thrive and shine. '
                                       'Our purpose is to support black dental students during their time at UFCD through mentorship, '
                                       'professional development, fellowship, and community service. '
                                       'Our organization has a great interest in increasing diversity within the field of dentistry.',
                           link='https://dental.ufl.edu/education/sai/student-involvement/student-organizations/bsag/')
    club63 = ClubDirectory(club_name='Black Student Assembly', tags='cultural|performing arts|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The Black Student Assembly is one of UF\'s yearly signature events and '
                                       'aims to celebrate Black talent within our community.',
                           link='https://www.instagram.com/ufbsac/?hl=en')
    club64 = ClubDirectory(club_name='Black Student Union', tags='cultural|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The purpose of the Black Student Union is to promote educate and exemplify the rich cultural heritage '
                                       'and unique diversity of the people of the African Diaspora. We accomplish this by creating leaders, '
                                       'cultivating success, and challenging each other.',
                           link='https://www.instagram.com/uf_bsu/?hl=en')
    club65 = ClubDirectory(club_name='Black Students in Business', tags='cultural|business|graduate|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The mission of the Black Business Student Association is to connect, support and '
                                       'empower black MBA students and to develop a culture of racial inclusion and allyship within the MBA community.',
                           link='https://www.instagram.com/ufbsib/')
    club66 = ClubDirectory(club_name='Black Women Leaders in Law', tags='cultural|law|professional dev|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Black Women Leaders in Law (BWLL) is an organization that aims to create a space on the University of Florida\'s campus '
                                       'for undergraduate black women scholars, enabling them to thrive in the field of legal justice. '
                                       'Founded upon the pillars of leadership, knowledge, and community, BWLL sets out to support black women scholars in the legal field, '
                                       'build a sense of togetherness and acceptance, and prepare students for the legal profession.',
                           link='https://www.instagram.com/bwleadersinlaw_uf/')
    club67 = ClubDirectory(club_name='Block and Bridle Club', tags='animal science|agriculture|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Block & Bridle is a student organization dedicated to promoting the interest and '
                                       'scholarship of animal sciences and agriculture.',
                           link='https://www.instagram.com/ufblockandbridle/')
    club68 = ClubDirectory(club_name='BlueScript', tags='performing arts|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='UF’s premiere screenwriting society',
                           link='https://www.instagram.com/bluescriptuf/?hl=en')
    club69 = ClubDirectory(club_name='Bob Graham Center Student Fellows', tags='professional dev|volunteering|law|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The Bob Graham Center Student Fellows serve as the official ambassadors of the Graham Center. '
                                       'Dedicated to improving the civic health of the University of Florida campus and the broader Gainesville community, '
                                       'this group of committed students utilize a committee system whereby members’ interests are at the forefront '
                                       'to address pressing issues in the community. The Student Fellows enjoy opportunities for leadership experience and '
                                       'professional development through the Center’s public programs, experiential learning opportunities, '
                                       'and small group discussions with policymakers and innovative public leaders.',
                           link='https://fellows.bobgrahamcenter.ufl.edu/')
    club70 = ClubDirectory(club_name='Bold Campus Ministry', tags='religious|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='',
                           link='https://www.instagram.com/boldcampusministryuf/')
    club71 = ClubDirectory(club_name='Brazilian Student Association', tags='cultural|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Our purpose is to empower and engage students that empathize with the Brazilian culture '
                                       'and traditions through service, academic, and social events.',
                           link='https://www.instagram.com/brasauf/')
    club72 = ClubDirectory(club_name='Business College Council', tags='business|professional dev|',
                           avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The Business College Council (BCC) is the governing body of over 40+ student organizations '
                                       'within the Warrington College of Business. We aim to create a stronger community by providing marketing advice '
                                       'and professional development resources to our student leaders. As the administrative liaison, '
                                       'we strive to uphold a tradition of excellence by enabling our student leaders and '
                                       'facilitating involvement for business students to maximize their potential.',
                           link='https://www.instagram.com/uf.bcc/?hl=en')
    club73 = ClubDirectory(club_name='Business Law Society', tags='business|law|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='The Business Law Society at the University of Florida is committed to empowering students '
                                       'with the knowledge and expertise they need as young professionals. We aim to provide unique and '
                                       'informative career growth opportunities that enable our students to flourish and succeed, '
                                       'all while positively impacting our local communities. ',
                           link='https://www.businesslawsocietyuf.org/')
    club74 = ClubDirectory(club_name='Camp Kesem', tags='volunteering|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='Camp Kesem UF was started in 2007, and the first camp started in August 2008. '
                                       'The camp is for children ages 6 to 13. The camp is of no cost to the children and their families, '
                                       'so University of Florida student volunteers are needed year-long to make this camp happen. '
                                       'UF students raise the money and organize the entire camp each year.',
                           link='https://www.gainesvillevolunteer.com/where-to-volunteer/camp-kesem-uf/#google_vignette')
    club75 = ClubDirectory(club_name='Caribbean Law Students Association', tags='cultural|law|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='',
                           link='https://www.instagram.com/ufcariblaw/')
    club76 = ClubDirectory(club_name='Caribbean Students Association', tags='cultural|', avg_overall_rating=0.0,
                           avg_soc_rating=0.0, avg_acad_rating=0.0, avg_exec_rating=0.0, active_mem=0,
                           description='In Caribsa we are dedicated to the academic success of our members and provide information about all '
                                       'of the countries in the Caribbean. Cuba Dominican Republic Haiti Puerto Rico Jamaica Trinidad and '
                                       'Tobago Guadeloupe Martinique Bahamas Barbados Saint Lucia Curaçao Aruba Saint Vincent and the Grenadines '
                                       'United States Virgin Islands Grenada Antigua and Barbuda Dominica Cayman Islands Saint Kitts and Nevis Sint Maarten Turks and Caicos Islands Saint Martin British Virgin Islands Caribbean Netherlands Anguilla Saint Barthélemy Montserrat',
                           link='https://ufcaribsadotorg.wordpress.com/')

    entities = [
        sample_review1, sample_review2, sample_review3, sample_review4, sample_review5, sample_review6, student_guest, student_test, student_jungkook, student_jhope,
        student_v, student_jimin, student_suga, student_jin, student_rm, student_lisa,
        student_jennie, student_rose, student_jisoo, clubExec_guestExec, admin,
        admin_julio, admin_erin, admin_graciela, admin_natalie, club1, club2,
        club3, club4, club5, club6, club7, club8, club9, club10, club11, club12,
        club13, club14, club15, club16, club17, club18, club19, club20, club21,
        club22, club23, club24, club25, club26, club27, club28, club29, club30,
        club31, club32, club33, club34, club35, club36, club37, club38, club39,
        club40, club41, club42, club43, club44, club45, club46, club47, club48,
        club49, club50, club51, club52, club53, club54, club55, club56, club57,
        club58, club59, club60, club61, club62, club63, club64, club65, club66,
        club67, club68, club69, club70, club71, club72, club73, club74, club75,
        club76
    ] # Used chatgpt to help condense this
    db.session.add_all(entities)
    db.session.commit()
    print('Database Seeded!')


@app.cli.command('db_show_tables')  # CLI command to show tables
def db_show_tables():
    """List all tables in the database."""
    tables = db.metadata.tables.keys()  # Get the names of the tables
    if tables:
        print("Tables in the database:")
        for table in tables:
            print(f"- {table}")
    else:
        print("No tables found in the database.")


@app.cli.command('db_show_users')  # CLI command to show users
def db_show_users():
    """List all users in the User table."""
    users = User.query.all()  # Query all User records
    if users:
        print("Users in the User table:")
        for user in users:
            print(f"- Email: {user.email}, Username: {user.username}, First Name: {user.first_name}, Last Name: {user.last_name}")
    else:
        print("No users found in the User table.")


@app.cli.command('db_show_directory')  # CLI command to show clubs
def db_show_directory():
    """List all users in the User table."""
    clubs = ClubDirectory.query.all()  # Query all club records
    if clubs:
        print("Clubs in the Club Directory:")
        for club in clubs:
            print(f"- Name: {club.club_name}, tags: {club.tags}, rating: {club.avg_overall_rating}, link: {club.link}")
    else:
        print("No clubs found in the Club Directory.")
