const RARITIES=['Common','Uncommon','Rare','Epic','Legendary','Mythic','Divine'];
const COLORS=['#b1b9ae','#74c38f','#66b7f1','#bb8fff','#eabd64','#f37868','#e6c9ff'];
const PEOPLE=[
['Naruto Uzumaki','Konoha','Uzumaki',['Academy','Genin','Sage Mode','KCM','Six Paths','Adult','Baryon Mode'],'rasengan'],
['Sasuke Uchiha','Uchiha','Uchiha',['Academy','Genin','Hebi','Mangekyō','Rinnegan'],'chidori'],
['Sakura Haruno','Konoha','Haruno',['Academy','Genin','Medical Ninja','Byakugō'],'heal'],
['Kakashi Hatake','Konoha','Hatake',['Jōnin','Sharingan','War Arc','Hokage'],'chidori'],
['Itachi Uchiha','Akatsuki','Uchiha',['ANBU','Akatsuki','Mangekyō','Edo Tensei'],'fire'],
['Madara Uchiha','Uchiha','Uchiha',['Founder','Edo Tensei','Rinnegan','Ten Tails'],'fire'],
['Pain','Akatsuki','Uzumaki',['Yahiko','Deva Path','Six Paths'],'push'],
['Orochimaru','Neutral','Unknown',['Sannin','Akatsuki','Reborn'],'revive'],
['Hinata Hyūga','Konoha','Hyūga',['Academy','Genin','Twin Lion Fists'],'byakugan'],
['Rock Lee','Konoha','Lee',['Genin','Drunken Fist','Six Gates'],'rush'],
['Gaara','Suna','Kazekage',['Genin','Shukaku','Kazekage'],'guard'],
['Minato Namikaze','Konoha','Namikaze',['Jōnin','Hokage','KCM'],'rush'],
['Obito Uchiha','Akatsuki','Uchiha',['Genin','Tobi','War Arc','Ten Tails'],'fire'],
['Kaguya Ōtsutsuki','Otsutsuki','Ōtsutsuki',['Awakened','Chakra Fruit','Rabbit Goddess'],'push'],
['Shikamaru Nara','Konoha','Nara',['Genin','Chūnin','Strategist'],'shadow'],
['Jiraiya','Konoha','Unknown',['Sannin','Sage Mode','Legend'],'rasengan'],
['Zabuza Momochi','Neutral','Momochi',['Mist Ninja','Demon of the Mist','Edo Tensei'],'guard']];
const ABILITIES={rasengan:['Rasengan','За 2 чакры: 4 урона вражескому лидеру.'],chidori:['Chidori','За 2 чакры: 5 урона самому слабому врагу; если поле пусто — лидеру.'],heal:['Medical Ninjutsu','За 2 чакры: восстановить 5 HP своему лидеру.'],fire:['Katon','За 2 чакры: 2 урона всем вражеским картам.'],push:['Shinra Tensei','За 2 чакры: 3 урона всем вражеским картам.'],revive:['Edo Tensei','За 2 чакры: воскресить последнего союзника с половиной HP.'],byakugan:['Byakugan','За 2 чакры: увидеть верхнюю карту колоды соперника и взять карту.'],rush:['Taijutsu','Может атаковать сразу. За 2 чакры: +2 ATK до конца боя.'],guard:['Sand Shield','Провокация: враги обязаны атаковать эту карту первой. За 2 чакры: +3 HP.'],shadow:['Shadow Possession','За 2 чакры: сильнейший враг пропускает следующую атаку.']};
// Real Kayou designs retain their official source identity; combat stats are ours.
const PERSON_RULES={
'Uchiha':['Uchiha','Uchiha','fire'], 'Hyuga':['Konoha','Hyūga','byakugan'],
'Kisame Hoshigaki':['Akatsuki','Hoshigaki','drain'],'Deidara':['Akatsuki','Unknown','fire'],'Sasori':['Akatsuki','Unknown','poison'],'Konan':['Akatsuki','Unknown','push'],'Hidan':['Akatsuki','Unknown','drain'],
'Temari':['Suna','Kazekage','push'],'Kankuro':['Suna','Unknown','poison'],'Tsunade':['Konoha','Senju','heal'],'Shizune':['Konoha','Unknown','heal'],'Kabuto Yakushi':['Neutral','Unknown','revive'],'Kimimaro':['Neutral','Kaguya','guard'],'Haku':['Neutral','Yuki','ice'],'Neji Hyuga':['Konoha','Hyūga','byakugan'],'Might Guy':['Konoha','Unknown','rush'],'Hashirama Senju':['Konoha','Senju','guard'],'Tobirama Senju':['Konoha','Senju','ice'],'Ino Yamanaka':['Konoha','Yamanaka','shadow'],'Shino Aburame':['Konoha','Aburame','poison'],'Choji Akimichi':['Konoha','Akimichi','guard'],'Sarada Uchiha':['Konoha','Uchiha','fire'],'Mitsuki':['Konoha','Unknown','poison'],'Boruto Uzumaki':['Konoha','Uzumaki','rasengan'],'Jugo':['Neutral','Unknown','rush'],'Karin':['Neutral','Uzumaki','heal'],'Suigetsu Hozuki':['Neutral','Hozuki','ice']};
const normalizeName=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
for(const c of KAYOU_CATALOG.filter(c=>c.cardKind!=='tactic')){if(!PEOPLE.some(p=>normalizeName(p[0])===normalizeName(c.name))){let rule=PERSON_RULES[c.name]||['Konoha','Unknown','rush'];if(['Jirobo','Kidomaru','Tayuya','Sakon and Ukon','Kin Tsuchi'].includes(c.name))rule=['Neutral','Unknown','shadow'];PEOPLE.push([c.name,rule[0],rule[1],['Kayou'],rule[2]])}}
Object.assign(ABILITIES,{poison:['Poison Mist','За 2 чакры: отравить сильнейшего врага — по 1 урону в начале двух его ходов.'],ice:['Ice Mirrors','За 2 чакры: нанести 2 урона слабейшему врагу и заморозить его следующую атаку.'],drain:['Chakra Drain','За 2 чакры: 2 урона вражескому лидеру и +2 HP своему.']});
ABILITIES.rasengan[1]='За 2 чакры: 2 + ⌊стоимость карты / 3⌋ урона вражескому лидеру.';
ABILITIES.chidori[1]='За 2 чакры: 3 урона слабейшему врагу, игнорируя защиту; если поле пусто — лидеру.';
ABILITIES.fire[1]='За 2 чакры: 1 урон всем вражеским картам.';
ABILITIES.push[1]='За 3 чакры: 2 урона всем вражеским картам.';
ABILITIES.heal[1]='За 2 чакры: восстановить 4 HP своему лидеру.';
ABILITIES.rush[1]='Может атаковать сразу. За 2 чакры: +1 ATK до конца боя.';
const variantCounts={};
const ARCS={academy:'Академия и команда 7',waves:'Страна Волн',chunin:'Экзамен на чунина',konoha:'Вторжение в Коноху',search:'Поиски Цунаде',retrieval:'Возвращение Саске',shippuden:'Shippuden',akatsuki:'Акацуки',war:'Четвёртая война',boruto:'Новое поколение',archive:'Архив шиноби'};
const TACTICS={bolt:['Решающий удар','Наносит 4 урона слабейшему врагу, иначе лидеру.',3,'chidori'],mend:['Воля защитника','Восстанавливает 6 HP лидеру.',2,'heal'],scout:['План операции','Возьми две карты.',3,'byakugan'],storm:['Натиск отряда','Наносит 2 урона всем вражеским шиноби.',4,'fire'],rally:['Боевой дух','Все союзные шиноби получают +1 ATK и +2 HP.',3,'guard'],seal:['Сдерживание','Сильнейший враг пропускает следующую атаку; возьми карту.',3,'shadow']};
const CARDS=KAYOU_CATALOG.map((src,index)=>{if(src.cardKind==='tactic'){const keys=Object.keys(TACTICS),effect=keys[index%keys.length],rule=TACTICS[effect];return {id:src.id,person:0,name:src.name,form:rule[0],sourceRarity:src.rarity,sourceCode:src.id,sourceSet:src.set,sourceURL:src.image,artKind:'kayou',faction:'Neutral',clan:'—',tags:['Тактика',src.arc],type:'Tactic',role:'tactic',rarity:src.rarityLevel,cost:rule[2],chakra:rule[2],atk:0,hp:0,def:0,speed:0,ability:rule[3],effect,power:rule[2]*3,image:src.localImage,arc:src.arc||'archive',stage:src.stage||'Хроника',arcVerified:!!src.arcVerified};}let pi=PEOPLE.findIndex(p=>normalizeName(p[0])===normalizeName(src.name)),p=PEOPLE[pi],n=variantCounts[pi]||0;variantCounts[pi]=n+1;const role=['balanced','striker','guardian'][index%3],cost=[2,4,6,3,7,5,8][n%7]-(index%9===0?1:0),def=role==='guardian'&&cost>=5?1:0;let atk=Math.max(1,cost+(role==='striker'?1:role==='guardian'?-2:-1)),hp=3*cost+3-atk*2-def*2;let ability=PERSON_RULES[src.name]?.[2]||p[4];if(p[2]==='Uchiha'&&n%3===2)ability='sharingan';const rule={...src};return {id:src.id,arc:src.arc||'archive',stage:src.stage||'Издание Kayou',arcVerified:!!src.arcVerified,person:pi,name:src.name,form:(src.stage&&src.stage!=='Издание Kayou'?src.stage+' · ':'')+src.rarity+' · '+src.id.split('-').slice(1).join('-'),sourceRarity:src.rarity,sourceCode:src.id,sourceSet:src.set,sourceURL:src.image,artKind:'kayou',faction:p[1],village:p[1]==='Konoha'?'Konohagakure':p[1]==='Suna'?'Sunagakure':'Unknown',clan:p[2],tags:[p[1],p[2],role,src.rarity],type:'Shinobi',role,rarity:src.rarityLevel,cost,chakra:cost,atk,hp,def,speed:ability==='rush'?3:1,ability,abilityCost:ability==='push'?3:2,power:atk*2+hp+def*2,image:src.localImage}});
ABILITIES.sharingan=['Sharingan','Первое попадание по этой карте за каждый ход наносит на 2 урона меньше. За 2 чакры: +1 ATK.'];
const byId=id=>CARDS.find(c=>c.id===id);
const CHAPTERS=[['Академия','Kakashi',3],['Страна Волн','Zabuza',16],['Экзамен на чунина','Gaara',10],['Вторжение в Коноху','Orochimaru',7],['Акацуки','Itachi',4],['Нападение Пейна','Pain',6],['Четвёртая война','Madara',5],['Лунная богиня','Kaguya',13]];
const RANKS=['Academy','Genin','Chūnin','Special Jōnin','Jōnin','ANBU','Kage','Legend','Six Paths'];
if(typeof module!=='undefined')module.exports={CARDS,byId,PEOPLE};

const BOSS_PASSIVES=['Каждый ход: +1 HP лидеру.','Каждый ход: первый союзник получает +1 HP.','Каждый ход: первый союзник получает +1 DEF, максимум 3.','Каждый ход: +2 HP лидеру.','Каждый ход: 1 урон твоему лидеру.','Каждый ход: 1 урон всем твоим картам.','Каждый ход: первый союзник получает +1 ATK.','Каждый ход: 2 урона твоему лидеру.'];

const portrait=pi=>CARDS.find(c=>normalizeName(c.name)===normalizeName(PEOPLE[pi]?.[0]||''))?.image||'assets/portrait-'+pi+'.png';
